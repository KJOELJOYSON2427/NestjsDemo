import { Module } from '@nestjs/common';
import { FileUploadModuleService } from './file-upload-module.service';
import { FileUploadModuleController } from './file-upload-module.controller';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import {MulterModule} from "@nestjs/platform-express" 
import { memoryStorage } from 'multer';
@Module({
  imports:[
    CloudinaryModule,
    TypeOrmModule.forFeature(
      [File]
    ),
    MulterModule.register({
      
      storage:memoryStorage(),
      fileFilter(req, file, callback) {
        console.log("not called");
        
          if(file.mimetype.match(/\/(jpg|jpeg|png)$/)){
            callback(null, true);
          }else{
            console.log("your feature");
            
             callback(new Error('Only image uploads allowed!'), false);
             
          }
      },
      limits:{
        fieldNameSize: 100,    // Max field name size in bytes
          fieldSize: 1 * 1024 * 1024, // Max field value size (default: 1MB)
         fields: 10,  
         fileSize: 2 * 1024 * 1024,
         
      }
    })
  ],
  providers: [FileUploadModuleService],
  controllers: [FileUploadModuleController]
})
export class FileUploadModuleModule {}
