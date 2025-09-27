import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserEventEmitterService } from './listerners/user-events.service';
import { UserRegistrationEventListener } from './listerners/user-registration.event';

@Module({
 imports:[
  EventEmitterModule.forRoot({
    global:true,
    wildcard:false,
    maxListeners:12,
    verboseMemoryLeak:true,
   
    
  })
 ],
 providers:[

      {
        provide:'UserService',
        useClass:UserEventEmitterService
      },
      UserRegistrationEventListener
 ],
 exports:[
  'UserService'
 ]
  
 })
export class EventsModule {}
