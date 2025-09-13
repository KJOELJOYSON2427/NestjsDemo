import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from './entities/user.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]) //this like registering in this module thus for injection for the rpository
    
  ],
  controllers: [AuthController],
  providers: [AuthService,PostsModule]
})
export class AuthModule {}
