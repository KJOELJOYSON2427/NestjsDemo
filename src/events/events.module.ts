import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
 imports:[
  EventEmitterModule.forRoot({
    global:true,
    wildcard:false,
    maxListeners:12,
    verboseMemoryLeak:true,
    delimiter:'.',
    
  })
 ]
  
 })
export class EventsModule {}
