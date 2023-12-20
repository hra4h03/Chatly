import {
    Controller,
    Get,
    HttpStatus,
    ParseFilePipeBuilder,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import * as path from 'path';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UseBasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { ProfileUploadDto } from 'src/user/dto/profile.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { v4 as uuidv4 } from 'uuid';

@Controller('user')
@ApiTags('User')
@UseBasicAuthGuard()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('me')
    me(@CurrentUser() user: User): UserDto {
        return UserDto.fromEntity(user);
    }

    @Post('profile')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const ext = path.extname(file.originalname);
                    callback(null, uuidv4() + ext);
                },
            }),
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'List of cats',
        type: ProfileUploadDto,
    })
    updateProfile(
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'jpeg',
                })
                .addMaxSizeValidator({
                    maxSize: 1024 * 1024,
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                }),
        )
        file: Express.Multer.File,
        @CurrentUser() user: User,
    ): UserDto {
        return UserDto.fromEntity(
            this.userService.addProfilePicture(user, file),
        );
    }
}
