import { Module } from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql"
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import { GamesModule } from "./games/games.module";
import { AchievementsModule } from './achievements/achievements.module';
@Module({
  imports:[
     GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver,
      autoSchemaFile:'src/schema.gql',
      debug: true,
      playground: true,
      sortSchema:true,
       

    }),
    GamesModule,
    AchievementsModule
  ]
})
export class AppModule {}
