import { Global, Injectable } from "@nestjs/common";
import { Injector } from "@nestjs/core/injector/injector";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { User } from "src/auth/entities/user.entity";
import { UserRegisteredEvent } from "./user-registration.eventPayload";
import UserRegisteredEventInterface from "./interface/UserRegistrationEvent";


@Injectable()
export class UserEventEmitterService{
      constructor(private readonly eventEmitter: EventEmitter2){
      }



      //Emit an user registered event 
      async emitUserRegistered(user:User):Promise<any>{  
        //create a user event
        console.log(`"came to " ${user.email}`);
        
         const event:UserRegisteredEventInterface & {
            timestamp:Date
         }={
            user:{
                email:user.email,
                id:user.id,
                name:user.name,
                password:user.password
            },
            timestamp:new Date()
         };
         console.log(`${event}`);
         

         this.eventEmitter.emit(
          'user.registered',event
          )




      }
}