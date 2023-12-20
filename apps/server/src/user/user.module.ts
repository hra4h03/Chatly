import { Module } from '@nestjs/common';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, UserRepository],
    exports: [UserRepository],
})
export class UserModule {}
