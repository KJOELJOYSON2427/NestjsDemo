import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Auth } from '../types/Auth.types';

export const CurrentUser =createParamDecorator(
    (data: string, ctx:ExecutionContext)=>{
       const request = ctx.switchToHttp().getRequest<{user:Auth}>()
       const user = request.user;

       return data ? user?.[data] : user;
    }
)
