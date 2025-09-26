import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entity/file.entity';
import { Repository } from 'typeorm';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { User } from 'src/auth/entities/user.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type  { Cache } from 'cache-manager';
import { resolve } from 'path';

@Injectable()
export class FileUploadModuleService {

    constructor(
        @InjectRepository(File) private readonly fileRepository:Repository<File>,
        private readonly cloudinaryService:CloudinaryService,
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache ,
    ){

    }


    async uploadFile(file: Express.Multer.File,user:User, description?:string):Promise<File>{
          const cloudinaryResponse= await this.cloudinaryService.uploadImage(file);
           const{
            original_filename,
            public_id,
            url,
            

           }=cloudinaryResponse;

           const newlyCreatedFile={
             originalName:original_filename,
             publicId:public_id,
             mimeType: file.mimetype,
             url:url,
             size:file.size,
             description,
             uploader:user
           }
           console.log(newlyCreatedFile);
           

           await this.fileRepository
           .createQueryBuilder('file')
           .insert()
           .into(File)
           .values(newlyCreatedFile)
           .execute()
        

           const savedFile= await this.fileRepository
           .createQueryBuilder('file')
           .leftJoinAndSelect('file.uploader', 'user')
           .andWhere('file.publicId= :publicId', {publicId: public_id})
           .getOne();
           console.log(savedFile);
           
           if(!savedFile){
            console.log("valo");
            
             throw new Error();
           }
          // Cache the saved file using publicId as the key

          await this.cacheManager.set<File>(`file:${public_id}`,savedFile ,3600)
           
           return savedFile;
    }


    async findAll(): Promise<File[]> {
  // Try to get from cache
  let files = await this.cacheManager.get<File[]>('fileAll');
  console.log("Got Hit byCache");
  
  if (files){
    console.log("Got Hit byCache");
    return files;
  } 

  // Fetch from DB if not cached
  const [data, count] = await this.fileRepository
    .createQueryBuilder('file')
    .leftJoinAndSelect('file.uploader', 'user')
    .orderBy('file.createdAt', 'DESC')
    .getManyAndCount();

  files = data; // extract entities

  // Cache the result for future requests
  await this.cacheManager.set<File[]>('fileAll', files, 3600); // 1 hour

  return files;
}

async remove(public_id: string){
  
  console.log(public_id);
  
  // 1️⃣ Fetch the file from DB
  const file = await this.fileRepository
  .createQueryBuilder('file')
  .where('file.publicId LIKE :publicId', { publicId: `%/${public_id}` })
  .getOne();

console.log(file);

  console.log(file);
  

   if (!file) {
    throw new Error('File not found');
  }

  // 2️⃣ Delete from Cloudinary
  await this.cloudinaryService.deleteFile(public_id);

  // 3️⃣ Delete from database
  await this.fileRepository
    .createQueryBuilder()
    .delete()
    .from(File)
    .where('publicId = :publicId', { publicId: public_id })
    .execute();

    
  // 4️⃣ Remove from cache

  await this.cacheManager.del(`file:${public_id}`)
  await this.cacheManager.del('fileAll');
}



}
