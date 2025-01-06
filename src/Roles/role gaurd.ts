import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    this.logger.debug(`Required roles: ${roles}`);

    if (!roles) {
      this.logger.debug('No roles defined, allowing access');
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    this.logger.debug(`User: ${JSON.stringify(user)}`);
    if (!user || !user.role) {
      this.logger.warn('No user or role found, denying access');
      return false;
    }

    const hasRole = roles.includes(user.role);
    this.logger.debug(`User role "${user.role}" is allowed: ${hasRole}`);
    return hasRole;
  }
}
