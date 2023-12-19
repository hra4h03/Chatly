import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { MessageDto } from 'src/chat-room/dto/message/message.dto';
import { User } from 'src/user/entities/user.entity';
import { ChatRoomService } from './chat-room.service';
import { ChatRoomDto } from 'src/chat-room/dto/chat-room.dto';

@Controller('chat-room')
@ApiTags('Chat Room')
@UseGuards(BasicAuthGuard)
export class ChatRoomController {
    constructor(private readonly chatRoomService: ChatRoomService) {}

    @Get('history/:uuid')
    history(@Param('uuid') uuid: string): Array<MessageDto> {
        return MessageDto.fromEntity(this.chatRoomService.getHistory(uuid));
    }

    @Get('join/:name')
    join(@CurrentUser() user: User, @Param('name') chatRoomName: string) {
        const chatRoom = this.chatRoomService.join(user, chatRoomName);
        return ChatRoomDto.fromEntity(chatRoom);
    }
}
