import { Injectable, CanActivate, ExecutionContext, Next, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles, ROLES_KEY } from '../custom-decorators/role-access.decorator';
import { UserRole } from '../entities/user.entity';
import { Auth } from '../types/Auth.types';
import { roleHierarchy } from '../constants/roleHierarchy';

//does the user has the role
//fetch from reflector then check the role 
//whether they can use it or not
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {

  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
   
     const request = context.switchToHttp().getRequest<{user: Auth}>();
     const user = request.user;
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>( //from handler 
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    

    if(!user){
       throw new ForbiddenException('User not authenticated')
    }
    //if there is no decoratoer, means anyone can use it so no roles means
    if(!requiredRoles){
      return true;
    }
  

    // const hasRequiredRole = requiredRoles.some((role)=> user.role == role)
const hasRequiredRole = requiredRoles.some(
  (role) => roleHierarchy[user.role] >= roleHierarchy[role],
);

 if(!hasRequiredRole){
    throw new UnauthorizedException("Invalid access to the route")
 }
    return true;
  }
}