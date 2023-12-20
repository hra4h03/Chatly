import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
    addProfilePicture(user: User, file: Express.Multer.File) {
        user.addProfilePicture(file.filename);
        return user;
    }
}
