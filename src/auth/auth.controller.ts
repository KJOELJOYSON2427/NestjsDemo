import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { log } from 'console';
import { Roles } from './custom-decorators/role-access.decorator';
import { UserRole } from './entities/user.entity';
import { User } from '@clerk/nextjs/server';
import { JwtAuthGaurd } from './gaurds/jwt-auth.gaurd';
import { CurrentUser} from './decorator/user.decorator';
import type { Auth } from './types/Auth.types';
import { RolesGuard } from './gaurds/roles-gaurd';

@Controller('auth')
export class AuthController {
     constructor(private authService: AuthService) {
   
  }


@Post('register')
  register(@Body()  registerDto:RegisterDto){
      return this.authService.register(registerDto);
  }


  @Post('login')
  login(@Body()  loginDto:LoginDto){
      return this.authService.signIn(loginDto);
  }

   @Post('refresh')
  refreshToken(@Body('refreshToken')  refreshToken:string){
      return this.authService.refreshToken(refreshToken);
  }





  @Get('profile')
@UseGuards(JwtAuthGaurd)
getProfile(@CurrentUser() user: Auth) {
  console.log('User from JWT:', user);
  return user;
}

   @Post("create-admin")
  @UseGuards(JwtAuthGaurd, RolesGuard)
  @Roles(UserRole.ADMIN)
  createAdmin(@Body()  registerDto: RegisterDto){
     return this.authService.registerAdmin(registerDto);
  }
}

