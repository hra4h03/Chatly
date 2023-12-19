import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UsernameAlreadyTakenException } from 'src/auth/errors/username-already-taken.error';
import { WrongCredentialsException } from 'src/auth/errors/wrong-credentials.error';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { HashUtils } from 'src/utils/hash.utils';

@Injectable()
export class AuthService {
    constructor(private readonly userRepository: UserRepository) {}

    async login(loginDto: LoginDto): Promise<User> {
        const user = this.userRepository.findByName(loginDto.username);
        if (!user) {
            throw new WrongCredentialsException();
        }

        const equal = await HashUtils.compare(loginDto.password, user.password);
        if (!equal) {
            throw new WrongCredentialsException();
        }

        return user;
    }

    async signup(signupDto: SignupDto): Promise<User> {
        const userExists = this.userRepository.findByName(signupDto.username);
        if (userExists) {
            throw new UsernameAlreadyTakenException();
        }

        const user = await User.create({
            name: signupDto.username,
            password: signupDto.password,
        });
        this.userRepository.save(user);
        return user;
    }
}
