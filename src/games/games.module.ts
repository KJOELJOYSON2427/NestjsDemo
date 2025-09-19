import { Module } from "@nestjs/common";
import { Model } from "mongoose";
import { GamesResolver } from "./games.resolver";
import { GamesService } from "./games.service";
import { AchievementsService } from "src/achievements/achievements.service";
import { AchievementsModule } from "src/achievements/achievements.module";
import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();
@Module({
    providers: [GamesResolver, GamesService, AchievementsService, {
      provide:'PUB_SUB',
      useValue: pubsub
    }],
    imports:[
      AchievementsModule
    ],
   
  exports: ['PUB_SUB'],
  })
  export class GamesModule {}
  