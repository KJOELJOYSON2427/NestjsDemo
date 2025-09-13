import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

import configuration from "./app.config"
import { Post } from './posts/entities/post.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type:'postgres',
        host:'localhost',
        port:3306,
        username:'root',
        password:'root',
        database:'nestjs',
        entities:[Post],
        synchronize:true

      }
    ),
     ConfigModule.forRoot({
      isGlobal: true,
       load: [configuration],
     }),
     PostsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
