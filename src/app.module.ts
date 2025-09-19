import { Module } from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql"
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import { GamesModule } from "./games/games.module";
import { AchievementsModule } from './achievements/achievements.module';
import { PubSub } from "graphql-subscriptions";


@Module({
  imports:[
     GraphQLModule.forRoot<ApolloDriverConfig>({
      driver : ApolloDriver,
      autoSchemaFile:'src/schema.gql',
      debug: true,
      introspection: true,
      sortSchema:true,
        csrfPrevention: true,
       subscriptions:{
        'graphql-ws':true,
        "subscriptions-transport-ws":true

       }

    }),
   
    GamesModule,
    AchievementsModule
  ],
  
})
export class AppModule {}
