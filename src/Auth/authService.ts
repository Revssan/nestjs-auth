// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(userId: number , Role:string): string {
    return this.jwtService.sign({ userId , Role});
  }

  verifyToken(token: string): any {
    return this.jwtService.verify(token);
  }
}
