// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/Auth/authService';
import { UserService } from 'src/User/userService';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { File } from 'src/file/file.entity';
import { FilesService } from 'src/File/file.service';
import { FilesController } from 'src/File/file.controller';
import { JwtAuthGuard } from './AuthGaurd';
@Module({
  imports: [
    TypeOrmModule.forFeature([User,File]), // Import the User entity for database interactions
    JwtModule.register({
      secret: 'your_secret_key', // Replace with a secure key
      signOptions: { expiresIn: '1h' }, // Configure token expiration
    }),
  ],
  controllers: [AuthController,FilesController], // Register the AuthController
  providers: [AuthService, UserService,FilesService,JwtAuthGuard], 
  exports: [AuthService], 
})
export class AuthModule {}
