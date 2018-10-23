import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';
import { AppError } from '../error/AppError';
import { AppErrorTypeEnum } from '../error/AppErrorTypeEnum';

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
      try {
        this.tokenService.verify(token);
        req.user = this.tokenService.decode(token);
      } catch (e) {
        throw new AppError(AppErrorTypeEnum.TOKEN_INVALID);
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
