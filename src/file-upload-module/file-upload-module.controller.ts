import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadModuleService } from './file-upload-module.service';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';

@Controller('file-upload-module')
export class FileUploadModuleController {
    
constructor(
       
        private readonly fileModuleService:FileUploadModuleService,
       
    ){

    }
    @Post('upload')
    @UseGuards(JwtAuthGaurd)
    @UseInterceptors(FileInterceptor('file'))
    uploadFile( @UploadedFile(
        new FileSizeValidationPipe()
    )file: Express.Multer.File){
        
    }
}
