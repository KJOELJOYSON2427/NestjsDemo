import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";



@Injectable()
export class FileSizeValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        console.log("came her for balid");
        
         const twoMb = 1024*1024*2;
         console.log(value.size <= twoMb);
         
         return value.size <= twoMb;
    }
    
}