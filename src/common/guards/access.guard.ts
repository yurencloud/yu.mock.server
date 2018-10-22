import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
    const jwtToken = req.headers.Authorization ? String(req.headers.Authorization) : null;

    if (jwtToken && jwtToken.indexOf('Bearer') === 0) {
      let token = jwtToken.substr(6);
      token = token.trim();
      if (token && this.tokenService.verify(token)) {
        req.user = this.tokenService.decode(token);
      }
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    return true;
  }
}
