import { BadRequestException } from '@nestjs/common';

export class UsernameAlreadyTakenException extends BadRequestException {
    constructor() {
        super('Username already taken');
    }
}
