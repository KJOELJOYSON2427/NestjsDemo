import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PostsModule } from 'src/posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/entities/post.entity';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants.jwt';
import * as fs from 'fs';
import { PassportModule } from '@nestjs/passport';
import { JwtStratergy } from './stratergies/jwtStartegy';
import { RolesGuard } from './gaurds/roles-gaurd';
import { JwtAuthGaurd } from './gaurds/jwt-auth.gaurd';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]), //this like registering in this module thus for injection for the rpository
    JwtModule.register({
      global:true,
      privateKey:fs.readFileSync('private.key', 'utf8'),
      publicKey:fs.readFileSync('public.key', 'utf8'),
      signOptions:{
        algorithm:'RS512',
       
      }
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStratergy, RolesGuard,JwtAuthGaurd],
  exports:[AuthService, RolesGuard, JwtAuthGaurd,JwtStratergy, TypeOrmModule]
})
export class AuthModule {}
