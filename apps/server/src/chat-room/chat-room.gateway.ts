import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UseBasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { CreateMessageDto } from 'src/chat-room/dto/message/create-message.dto';
import { Message } from 'src/chat-room/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { ChatRoomService } from './chat-room.service';
import { MessageDto } from 'src/chat-room/dto/message/message.dto';
import { MessageType } from 'src/chat-room/entities/message.enum';

@WebSocketGateway({
    cors: true,
})
@UseBasicAuthGuard()
export class ChatRoomGateway implements OnGatewayConnection {
    private readonly logger = new Logger(ChatRoomGateway.name);
    @WebSocketServer()
    private server: Server;

    constructor(private readonly chatRoomService: ChatRoomService) {}

    handleConnection(client: Socket) {
        this.logger.log(`client-connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`client-disconnected: ${client.id}`);
        client.rooms.forEach((room) => {
            client.to(room).emit('participant-left', client.id);
        });
    }

    @SubscribeMessage('join-room')
    joinRoom(
        @CurrentUser() user: User,
        @MessageBody() chatRoomId: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.join(chatRoomId);
        this.chatRoomService.join(user, chatRoomId);

        const newMessage = Message.create({
            owner: user,
            chatRoomId: chatRoomId,
            content: `${user.name} joined the room`,
            messageType: MessageType.ADMINISTRATIVE,
        });

        this.server
            .to(chatRoomId)
            .emit('new-message', MessageDto.fromEntity(newMessage));
    }

    @SubscribeMessage('leave-room')
    leaveRoom(
        @CurrentUser() user: User,
        @MessageBody() chatRoomId: string,
        @ConnectedSocket() client: Socket,
    ) {
        client.leave(chatRoomId);
        this.chatRoomService.leave(user, chatRoomId);

        const newMessage = Message.create({
            owner: user,
            chatRoomId: chatRoomId,
            content: `${user.name} leaved the room`,
            messageType: MessageType.ADMINISTRATIVE,
        });

        this.server
            .to(chatRoomId)
            .emit('new-message', MessageDto.fromEntity(newMessage));
    }

    @SubscribeMessage('post-message')
    postMessage(
        @CurrentUser() user: User,
        @MessageBody() createMessageDto: CreateMessageDto,
    ) {
        const message = this.chatRoomService.newMessage(
            user,
            createMessageDto.chatRoomId,
            createMessageDto.content,
        );
        this.server
            .to(createMessageDto.chatRoomId)
            .emit('new-message', message);
    }
}
