import { Module, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { posix } from 'path';

@Module({
  imports:[
  TypeOrmModule.forFeature([Post])
  ],
  providers: [PostsService,ValidationPipe],
  controllers: [PostsController],
  exports:[]
})
export class PostsModule {}
