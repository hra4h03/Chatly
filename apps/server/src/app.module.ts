import { Module } from '@nestjs/common';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [ChatRoomModule, UserModule, AuthModule],
})
export class AppModule {}
