import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from "@nestjs/common";
import { PostsService } from "../posts.service";
import { PostEntity } from "../postEntity";

@Injectable()
export class PostExistsPipe implements PipeTransform<number> {
  constructor(private readonly postsService: PostsService) {}

   async transform(value: number, metadata: ArgumentMetadata) {
    console.log("came",value);
    
    const id = Number(value);
    if (isNaN(id)) {
      throw new NotFoundException(`Invalid post id: ${value}`);
    }

    const post = await this.postsService.findOne(id);
    console.log(post);
    
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    console.log(post);
    
    return new PostEntity(post); // return the actual post object
  }
}





















//    async transform(value: any, {metatype}: ArgumentMetadata) {
//          if(!metatype || !this.toValidate(metatype)){
//             return value;
//          }

//          const object =plainToInstance(metatype, value);
//          const errors = await validate(object);
// if (errors.length > 0) {
//       // throw all error messages in one
//       throw new BadRequestException(
//         errors.map(err => ({
//           property: err.property,
//           constraints: err.constraints,
//         })),
//       );
//     }
//     console.log("came", object);
    
//     return object;
//     }
   

//       private toValidate(metatype: Function): boolean {
//     // ✅ only validate if it's our CreatePostDto
//     return metatype === CreatePostDto;
//   }
    
// }