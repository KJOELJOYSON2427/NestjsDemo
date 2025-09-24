import { Module } from '@nestjs/common';
import { FileUploadModuleService } from './file-upload-module.service';
import { FileUploadModuleController } from './file-upload-module.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports:[
    CloudinaryModule
  ],
  providers: [FileUploadModuleService],
  controllers: [FileUploadModuleController]
})
export class FileUploadModuleModule {}
