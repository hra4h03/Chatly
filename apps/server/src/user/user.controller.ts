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
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { UseBasicAuthGuard } from 'src/auth/guards/basic-auth.guard';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { ProfileUploadDto } from 'src/user/dto/profile.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('user')
@ApiTags('User')
@UseBasicAuthGuard()
export class UserController {
    constructor(private readonly fileUploadService: FileUploadService) {}

    @Get('me')
    me(@CurrentUser() user: User): UserDto {
        return UserDto.fromEntity(user);
    }

    @Post('profile')
    @UseInterceptors(FileInterceptor('file'))
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
    ) {
        return this.fileUploadService.store(file);
    }
}
