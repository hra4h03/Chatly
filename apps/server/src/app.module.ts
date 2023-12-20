import { Module } from '@nestjs/common';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
    imports: [ChatRoomModule, UserModule, AuthModule, FileUploadModule],
    providers: [],
})
export class AppModule {}
