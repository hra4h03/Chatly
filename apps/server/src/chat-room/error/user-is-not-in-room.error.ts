import { BadRequestException } from '@nestjs/common';

export class UserIsNotInRoomException extends BadRequestException {
    constructor() {
        super('User is not in this room');
    }
}
