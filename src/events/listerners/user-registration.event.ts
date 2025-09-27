import { Inject, Injectable, Logger } from "@nestjs/common";
import { UserEventEmitterService } from "./user-events.service";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRegisteredEvent } from "./user-registration.eventPayload";
import { time } from "console";
import UserRegisteredEventInterface from "./interface/UserRegistrationEvent";


@Injectable()
export class UserRegistrationEventListener{


    constructor(@Inject('UserService') private readonly userEventRegistrationService:UserEventEmitterService){

    }

    private readonly logger=new Logger(UserRegistrationEventListener.name);


    @OnEvent('user.registered')
     handleuserRegisteredEvent(payload:UserRegisteredEventInterface &{
        timestamp:Date
    }){
        console.log(payload)
        const { user: { email, ...rest } } =payload;
        this.logger.log(`
            Welcome , ${email}! Your Account created at `)
    }
}