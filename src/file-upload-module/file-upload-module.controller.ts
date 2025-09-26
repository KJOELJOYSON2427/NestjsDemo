import { BadRequestException, Body, Controller, Delete, FileTypeValidator, FileValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseIntPipe, ParseUUIDPipe, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FileUploadModuleService } from './file-upload-module.service';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { FileSizeValidationPipe } from './pipes/FileSizeValidationPipe.pipe';
import { UploadFileDto } from './dto/file-upload.dto';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { User, UserRole } from 'src/auth/entities/user.entity';
import { isInstance } from 'class-validator';
import { File } from './entity/file.entity';
import { Roles } from 'src/auth/custom-decorators/role-access.decorator';


@Controller('files')
export class FileUploadModuleController {
  constructor(private readonly fileModuleService: FileUploadModuleService) {}

    @Post('upload1')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(
    FileFieldsInterceptor([
        {
            name:"avatar",
            maxCount:2
        },
        {
             name:'background',
             maxCount:2
        }
    ])
  )
  upload1File(@UploadedFiles() files:{
    avatar?:Express.Multer.File[],
   background?: Express.Multer.File[] 
  }) {
  console.log(files);
}
  
  @Post('upload')
  @UseGuards(JwtAuthGaurd)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
          
      new ParseFilePipe({
        fileIsRequired: true,
        errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        exceptionFactory: (error) => {
          console.error('Validation failed:', error);
          throw new BadRequestException({
            message: 'Invalid file upload',
            details: error,
          });
        },
        validators: [
          new MaxFileSizeValidator({
            maxSize: 2 * 1024 * 1024, // 2MB
            message: (maxSize) =>
              `File too large. Max size is ${Math.round(
                maxSize / 1024 / 1024,
              )}MB`,
          }),
       

          new FileTypeValidator({
            fileType: /^image\/(jpg|jpeg|png)$/, // matches mimetype
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() uploadFileDto: UploadFileDto,
    @CurrentUser() user: User,
  ): Promise<File> {
    const result = await this.fileModuleService.uploadFile(
      file,
      user,
      uploadFileDto?.description,
    );

    return result;
  }


  @Get()
  async findAll(){
    return this.fileModuleService.findAll()
  }

   @Delete(':id')
   @UseGuards(JwtAuthGaurd)
   @Roles(UserRole.ADMIN)
  async remove(@Param('id') id :string){
      const result={
         message:"File Upload Successful"
      }
     await this.fileModuleService.remove(id);
     return result;
  }

}

