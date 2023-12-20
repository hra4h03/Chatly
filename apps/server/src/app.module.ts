import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { ChatRoomModule } from './chat-room/chat-room.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ChatRoomModule,
        UserModule,
        AuthModule,
        ServeStaticModule.forRoot({
            serveRoot: '/uploads',
            rootPath: path.join(__dirname, '..', 'uploads'),
        }),
    ],
    providers: [],
})
export class AppModule {}
