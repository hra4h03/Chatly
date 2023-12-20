import { ApiProperty } from '@nestjs/swagger';

export class ProfileUploadDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
