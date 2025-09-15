import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import * as fs from "fs";
import { UserRole } from "../entities/user.entity";



@Injectable()
export class JwtStratergy extends PassportStrategy(Strategy){
    
     constructor(private authService: AuthService) {
          super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(), //get the data from the token
             secretOrKey: fs.readFileSync('public.key'),
             algorithms: ['RS512'],
            ignoreExpiration:false
         });
  }


   async validate(payload: any) {
         try{
              const user = await this.authService.getUserById(payload.sub)
              return{
                ...user,
                role:payload.role as UserRole  //user  & Admin
              }
         }catch(e){
            throw new UnauthorizedException('Invalid  Token')
         }
     }
}