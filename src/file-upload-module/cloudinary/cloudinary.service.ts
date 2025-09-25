import { Inject, Injectable } from '@nestjs/common';
import { v2, UploadApiResponse } from 'cloudinary';
import { CLOUDINARY } from './cloudinary.provider';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
  
  folderName: string;

  constructor(
    @Inject(CLOUDINARY.name)
    private readonly cloudinary: typeof v2,
  ) {
    this.folderName = 'nestjs';
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = this.cloudinary.uploader.upload_stream(
        { folder: this.folderName, resource_type: 'auto', access_mode: 'public' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result!); // result is guaranteed in success case
        },
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(upload);
    });
  }

  async deleteFile(publicId : string):Promise<boolean>{
    return await this.cloudinary.uploader.destroy(publicId,{
        resource_type:"auto"
    })? true:false;
  }


  
}
