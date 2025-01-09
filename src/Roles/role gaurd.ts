import { Injectable, CanActivate, ExecutionContext, Logger, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  private readonly logger = new Logger(RolesGuard.name);

  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve roles metadata from the handler
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    this.logger.debug(`Required roles: ${roles}`);

    if (!roles) {
      this.logger.debug('No roles defined, allowing access');
      return true; // No roles defined, allow access
    }

    // Retrieve the request and user
    const request = context.switchToHttp().getRequest();
    const user = request.user; // `user` should already be attached by `JwtAuthGuard`

    this.logger.debug(`User: ${JSON.stringify(user)}`);
    if (!user || !user.role) {
      this.logger.warn('No user or role found, denying access');
      throw new UnauthorizedException('Access denied: No user or role found');
    }

    // Check if the user has the required role
    const hasRole = roles.includes(user.role);
    this.logger.debug(`User role "${user.role}" is allowed: ${hasRole}`);
    if (!hasRole) {
      this.logger.warn(`Access denied: User role "${user.role}" not allowed`);
      throw new UnauthorizedException('Access denied: Insufficient permissions');
    }

    return true;
  }
}
