import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { NotFoundFilter } from './not-found/not-found.filter';
import { PostEntity } from './postEntity';
import { CreatePostDto } from './dto/create-post-dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';
import { Post as Postinterface } from './entities/post.entity';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { RolesGuard } from 'src/auth/gaurds/roles-gaurd';
import { CurrentUser } from 'src/auth/decorator/user.decorator';
import { currentUser } from '@clerk/nextjs/server';
import { User } from 'src/auth/entities/user.entity';
import { SkipThrottle, Throttle, ThrottlerException, ThrottlerGuard } from '@nestjs/throttler';
import { LoginThrottler } from 'src/auth/throttler/login.throttler';
import { FindPostsQueryDto } from './dto/find-post-dto';
import { PaginatedResponse } from 'src/common/interface/paginated.interface';
@SkipThrottle()
@Controller('posts')
export class PostsController {

  constructor(private readonly postService: PostsService) {

  }

  @Get("/")
 async  findAllPost( @Query() query:FindPostsQueryDto): Promise<PaginatedResponse<Postinterface>> {
    return await this.postService.findAll(query);
  }


  @Get(':id')
  async findone(@Param('id', ParseIntPipe) id: number): Promise<Postinterface> {
    return this.postService.findOne(id)
  }



  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @UseGuards(JwtAuthGaurd,LoginThrottler)
 
  async create(@Body() createPostData: CreatePostDto, @CurrentUser() currentUser: User): Promise<Postinterface> {
    return this.postService.create(createPostData, currentUser);
  }



  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @UseGuards(JwtAuthGaurd)
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  async update(
    @Param('id', ParseIntPipe, PostExistsPipe) post: PostEntity,
    @Body() updatePostData: UpdatePostDto,
    @CurrentUser() user: User,
  ): Promise<PostEntity> {
    console.log(updatePostData);
    return this.postService.update(post.id as number, updatePostData, user);
  }
  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGaurd)



  
  async delete(
    @Param('id', ParseIntPipe) id: number,

  ): Promise<{ message: String }> {
    const postMessage = this.postService.remove(id);
    return postMessage;
  }





}
