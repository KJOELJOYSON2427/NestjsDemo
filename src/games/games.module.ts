import { Module } from "@nestjs/common";
import { Model } from "mongoose";
import { GamesResolver } from "./games.resolver";
import { GamesService } from "./games.service";
import { AchievementsService } from "src/achievements/achievements.service";
import { AchievementsModule } from "src/achievements/achievements.module";

@Module({
    providers: [GamesResolver, GamesService, AchievementsService],
    imports:[
      AchievementsModule
    ]
  })
  export class GamesModule {}
  