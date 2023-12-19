import { UnauthorizedException } from '@nestjs/common';

export class BrokenAuthorizationException extends UnauthorizedException {
    constructor() {
        super('Invalid username or password');
    }
}
