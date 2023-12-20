import { Module } from '@nestjs/common';
import { FileUploadModule } from 'src/file-upload/file-upload.module';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [FileUploadModule],
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
