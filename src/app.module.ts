import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { File } from './file/file.entity';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'Revs@6820', 
      database: 'postgres', 
      entities: [User, File], 
      synchronize: true, 
    }),

    // Configure JWT module
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' }, 
    }),AuthModule
  ],
})
export class AppModule {}
