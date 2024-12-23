// src/files/files.controller.ts
import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { JwtAuthGuard } from 'src/Auth/AuthGaurd';
  import { FilesService } from './file.service';
  
  @Controller('files')
  export class FilesController {
    constructor(private readonly filesService: FilesService) {}
  
    @UseGuards(JwtAuthGuard)
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const filename = `${Date.now()}-${file.originalname}`;
            callback(null, filename);
          },
        }),
      }),
    )
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Req() req) {
      const user = req.user;
      const savedFile = await this.filesService.saveFile(user, file.filename, file.path);
      return { message: 'File uploaded successfully', file: savedFile };
    }
  }
  