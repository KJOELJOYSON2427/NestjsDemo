import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";



@Injectable()
export class FileSizeValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
         const twoMb = 1024*1024*2;
         return value.size <= twoMb;
    }
    
}