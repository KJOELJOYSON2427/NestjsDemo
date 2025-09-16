import { Module, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { posix } from 'path';
import { JwtAuthGaurd } from 'src/auth/gaurds/jwt-auth.gaurd';
import { JwtService } from '@nestjs/jwt';
import { JwtStratergy } from 'src/auth/stratergies/jwtStartegy';
import { RolesGuard } from 'src/auth/gaurds/roles-gaurd';
import { User } from 'src/auth/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
  TypeOrmModule.forFeature([Post, User]),
  AuthModule
  ],
  providers: [PostsService,ValidationPipe,
    JwtAuthGaurd,
    JwtService,
    JwtStratergy,
    RolesGuard
  ],
  controllers: [PostsController],
  exports:[PostsService]
})
export class PostsModule {}
