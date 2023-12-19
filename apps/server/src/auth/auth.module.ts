import { Module } from '@nestjs/common';
import { AuthController } from 'src/auth/auth.controller';
import { BasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [BasicAuthGuard, AuthService],
    exports: [BasicAuthGuard],
})
export class AuthModule {}
