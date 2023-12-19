import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
    UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { HashUtils } from 'src/utils/hash.utils';
import { UserRepository } from '../../user/repository/user.repository';
import { User } from 'src/user/entities/user.entity';
import { BrokenAuthorizationException } from 'src/auth/errors/broken-authorization.error';
import { RequestContext } from 'src/utils/request.utils';

export interface RequestWithUser extends Request {
    user: User;
}

@Injectable()
export class BasicAuthGuard implements CanActivate {
    constructor(private readonly userRepository: UserRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = RequestContext.get<RequestWithUser>(context);
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException('Authorization header is missing');
        }

        const [type, credentials] = authHeader.split(' ');

        if (type !== 'Basic') {
            throw new UnauthorizedException('Invalid authentication type');
        }

        const [username, password] = Buffer.from(credentials, 'base64')
            .toString()
            .split(':');

        const user = this.userRepository.findByName(username);

        if (!user) throw new BrokenAuthorizationException();

        const isValid = await HashUtils.compare(password, user.password);

        if (!isValid) throw new BrokenAuthorizationException();

        request.user = user;

        return true;
    }
}

export const UseBasicAuthGuard = () => UseGuards(BasicAuthGuard);
