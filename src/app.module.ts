import { Module } from "@nestjs/common";
import {GraphQLModule} from "@nestjs/graphql"
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo"
import { GamesModule } from "./games/games.module";
import { AchievementsModule } from './achievements/achievements.module';
import { PubSub } from "graphql-subscriptions";
import { CharacterModule } from './character/character.module';


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
       

       },
       inheritResolversFromInterfaces:true

    }),
   
    GamesModule,
    AchievementsModule,
    CharacterModule
  ],
  
})
export class AppModule {}
