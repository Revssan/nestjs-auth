// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './file.entity';
import { User } from '../user/user.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async saveFile(user: User, filename: string, path: string): Promise<File> {
    const file = this.fileRepository.create({ user, filename, path });
    return this.fileRepository.save(file);
  }
}
