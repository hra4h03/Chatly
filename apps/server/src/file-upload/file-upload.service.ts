import { Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
    store(file: Express.Multer.File) {
        return file.filename;
    }
}
