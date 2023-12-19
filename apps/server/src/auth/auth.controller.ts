import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/dto/login.dto';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<UserDto> {
        const user = await this.authService.login(loginDto);
        return UserDto.fromEntity(user);
    }

    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<UserDto> {
        const user = await this.authService.signup(signupDto);
        return UserDto.fromEntity(user);
    }
}
