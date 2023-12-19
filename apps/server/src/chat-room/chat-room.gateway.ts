import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UseBasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { CreateMessageDto } from 'src/chat-room/dto/message/create-message.dto';
import { User } from 'src/user/entities/user.entity';
import { ChatRoomService } from './chat-room.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
@UseBasicAuthGuard()
export class ChatRoomGateway implements OnGatewayConnection {
    private readonly logger = new Logger(ChatRoomGateway.name);

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
        client.to(chatRoomId).emit('new-participant', user);
    }

    @SubscribeMessage('post-message')
    postMessage(
        @CurrentUser() user: User,
        @MessageBody() createMessageDto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        this.chatRoomService.newMessage(
            user,
            createMessageDto.chatRoomId,
            createMessageDto.content,
        );
        client.to(createMessageDto.chatRoomId).emit('new-message', {
            content: createMessageDto.content,
            owner: user,
        });
    }
}
