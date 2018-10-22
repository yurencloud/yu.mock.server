import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    // 如果没有角色要求，就允许访问
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    // 如果有角色要求，用户就必须是登录状态
    const request = context.switchToHttp().getRequest();
    const user = request.session.user;
    if (!user) {
      return false;
    }

    const hasRole = () => user.roles.some((role) => !!roles.find((item) => item === role));
    return user && user.roles && hasRole();
  }
}
