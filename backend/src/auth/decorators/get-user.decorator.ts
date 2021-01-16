import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

export const UserData = createParamDecorator(
  (data: any, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest();

    return data ? req.user[data] : req.user;
  },
);
