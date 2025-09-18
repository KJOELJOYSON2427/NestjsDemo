import { Module } from "@nestjs/common";
import { Model } from "mongoose";
import { GamesResolver } from "./games.resolver";
import { GamesService } from "./games.service";
import { AchievementsService } from "src/achievements/achievements.service";

@Module({
    providers: [GamesResolver, GamesService, AchievementsService],
   
  })
  export class GamesModule {}
  