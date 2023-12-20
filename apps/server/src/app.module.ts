import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
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
        // MulterModule.register({
        //     storage: diskStorage({
        //         destination: './uploads',
        //         filename: (req, file, callback) => {
        //             const ext = path.extname(file.originalname);
        //             callback(null, uuidv4() + ext);
        //         },
        //     }),
        // }),
    ],
    providers: [],
})
export class AppModule {}
