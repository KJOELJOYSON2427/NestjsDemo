import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';

import configuration from "./app.config"
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        type:'postgres',
        host:'localhost',
        port:5432,
        username:'postgres',
        password:'joel.2427',
        database:'nestjs',
        entities:[Post , User],
        synchronize:true

      }
    ),
     ConfigModule.forRoot({
      isGlobal: true,
       load: [configuration],
     }),
     PostsModule,
     AuthModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
