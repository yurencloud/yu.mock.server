import {
  ExecutionContext,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly tokenService: TokenService,
  ) {
  }

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const jwtToken = req.headers.authorization ? String(req.headers.authorization) : null;
    if (jwtToken && jwtToken.indexOf('Bearer') === 0) {
      let token = jwtToken.substr(6);
      token = token.trim();
      if (token && this.tokenService.verify(token)) {
        req.user = this.tokenService.decode(token);
      }
    } else {
      return false;
    }

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles) {
      return req.user.roles.some(role => roles.indexOf(role) > -1);
    }
    return true;
  }
}
