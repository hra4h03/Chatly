import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { ChatRoomRepository } from 'src/chat-room/repositories/chat-room.repository';
import { UserModule } from 'src/user/user.module';
import { ChatRoomController } from './chat-room.controller';
import { ChatRoomGateway } from './chat-room.gateway';
import { ChatRoomService } from './chat-room.service';

@Module({
    imports: [AuthModule, UserModule],
    providers: [ChatRoomGateway, ChatRoomService, ChatRoomRepository],
    controllers: [ChatRoomController],
})
export class ChatRoomModule {}
