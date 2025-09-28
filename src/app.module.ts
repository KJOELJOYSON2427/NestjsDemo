import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PostsModule } from './posts/posts.module';
import { GraphQLModule } from '@nestjs/graphql';

import configuration from "./app.config"
import { Post } from './posts/entities/post.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FileUploadModuleModule } from './file-upload-module/file-upload-module.module';
import { File } from './file-upload-module/entity/file.entity';
import { EventsModule } from './events/events.module';
import { LoggerMiddleware } from './common/logger/logger.middleware';
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
        entities:[Post , User,File],
        synchronize:true

      },

    ),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60_000,
          limit: 10,
        },
      ],
    }),
    CacheModule.register({
      isGlobal:true,
  ttl: 0,
  max:100 // milliseconds
  
}),ConfigModule.forRoot({
  isGlobal: true
})
,
     ConfigModule.forRoot({
      isGlobal: true,
       load: [configuration],
     }),
     PostsModule,
     AuthModule,
     FileUploadModuleModule,
     EventsModule,
    
  ],
  controllers: [AppController],
  providers: [AppService
   
  ],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
    .forRoutes("*")
  }
  
}
