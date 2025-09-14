import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants.jwt';
import * as fs from 'fs';
@Module({
  imports:[
    TypeOrmModule.forFeature([User]), //this like registering in this module thus for injection for the rpository
    JwtModule.register({
      global:true,
      privateKey:fs.readFileSync('private.key'),
      publicKey:fs.readFileSync('public.key'),
      signOptions:{
        algorithm:'RS512',
        expiresIn: '1h',
       
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,PostsModule]
})
export class AuthModule {}
