// src/auth/auth.controller.ts
import {
    Controller,
    Post,
    Body,
    BadRequestException,
    UnauthorizedException,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from 'src/User/userService';
  import { AuthService } from './authService';
import { RolesGuard } from 'src/Roles/role gaurd';
import { Roles } from 'src/Roles/roles.decorator.ts';
import { JwtAuthGuard } from './AuthGaurd';
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
    ) {}
  
    /**
     * Register a new user
     */
    @Post('register')
    async register(
      @Body('username') username: string,
      @Body('password') password: string,
      @Body('Role') Role:string,
    ) {
      if (!username || !password) {
        throw new BadRequestException('Username and password are required');
      }
  
      const existingUser = await this.userService.validateUser(username, password);
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
  
      const newUser = await this.userService.createUser(username, password, Role);
      return { message: 'User registered successfully', userId: newUser.id };
    }
  
    /**
     * Login a user and issue a JWT
     */
    @Post('login')
    async login(
      @Body('username') username: string,
      @Body('password') password: string,
    ) {
      const user = await this.userService.validateUser(username, password);
      if (!user) {
        throw new UnauthorizedException('Invalid credentials');
      }
  
      const token = this.authService.generateToken(user.id, user.Role);
      return { message: 'Login successful', token };
    }
  }
  