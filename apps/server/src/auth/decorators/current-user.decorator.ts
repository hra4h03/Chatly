import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser } from 'src/auth/guards/basic-auth.guard';
import { RequestContext } from 'src/utils/request.utils';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = RequestContext.get<RequestWithUser>(ctx);
        return request.user;
    },
);
