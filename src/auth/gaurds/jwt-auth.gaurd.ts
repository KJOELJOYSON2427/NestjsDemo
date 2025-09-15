import { CanActivate, ExecutionContext, Injectable, SetMetadata } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthGuard } from "@nestjs/passport";


@Injectable()

//proctects the routes requires authentication 
export class JwtAuthGaurd extends AuthGuard('jwt'){
}