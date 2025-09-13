import {  Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { NotFoundFilter } from './not-found/not-found.filter';
import { PostEntity } from './postEntity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

@Controller('posts')
export class PostsController {

    constructor(private readonly postService:PostsService){

    }

    @Get("/")
    findAllPost(@Query("search") search?:string):PostInterface[]{
        const extractedPosts=this.postService.findAll();
        if(search){
            return extractedPosts.filter((singlePost)=>{
                return singlePost.title.toLowerCase().includes(search.toLowerCase())
            })
        }
        return extractedPosts;
    }
@UseFilters(NotFoundFilter)
   @Get(':id')
findOne(@Param('id') id: number): PostInterface {
  return this.postService.findOne(id);
}

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    create(@Body() createPostData: CreatePostDto):PostInterface{
            return this.postService.create(createPostData);
    }



@UseInterceptors(ClassSerializerInterceptor)
@Patch(':id')
update(
  @Param('id', ParseIntPipe, PostExistsPipe) post: PostEntity,
  @Body() updatePostData: UpdatePostDto
): PostEntity {
  console.log(updatePostData);
  return this.postService.update(post.id as number, updatePostData);
}
    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(
        @Param('id', ParseIntPipe) id : number,
         
    ){
        return this.postService.remove(id);
    }
  


   

}
