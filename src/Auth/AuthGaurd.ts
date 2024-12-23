// src/auth/jwt-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from './authService';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    try {
      const payload = this.authService.verifyToken(token);
      request.user = payload.userId;
      return true;
    } catch {
      return false;
    }
  }
}
