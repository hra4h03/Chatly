import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export class RequestContext {
    static get<T extends Request>(context: ExecutionContext): T {
        if (context.getType() === 'http') {
            return context.switchToHttp().getRequest();
        } else if (context.getType() === 'ws') {
            return context.switchToWs().getClient().handshake;
        }
        throw new UnauthorizedException('Invalid context type');
    }
}
