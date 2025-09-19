import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver, Subscription } from "@nestjs/graphql";
import { Game } from "./types/games.type";
import { Achievement, Difficulty } from "src/achievements/types/achievements.type";
import { AchievementsService } from "src/achievements/achievements.service";
import { PaginatioArgs } from "./args/achievement.args";
import { CreateGameInput } from "./args/create-input.types";
import { GamesService } from "./games.service";

import { PubSub } from "graphql-subscriptions";
import { Inject } from "@nestjs/common";


@Resolver(() => Game)
export class GamesResolver {
    constructor(private readonly achievementsService: AchievementsService,
      private readonly gamesService: GamesService,
      @Inject('PUB_SUB') private readonly pubSub: PubSub
    ) {}


    private games : Game[]=[
  { id: 1, name: 'Gost', genre: 'Horror' },
        { id: 2, name: 'Mario', genre: 'Adventure' },
    ]
    @Query(() => [Game], { name: 'gameWithOffset' })
    async getAllWithOffset(@Args() {offset =0,limit= 2}:PaginatioArgs): Promise<Game[]> {
      return this.games.slice(
  offset, offset+limit
      );
    }


    @Query(() => [Game], { name: 'games' })
    async getAll(): Promise<Game[]> {
      return [
        { id: 1, name: 'Gost', genre: 'Horror' },
        { id: 2, name: 'Mario', genre: 'Adventure' },
      ];
    }

    @Query(()=>Game, {name: 'game'})
    async getGamesById( @Args('id',{
      type:()=>Int
    }) id: number):Promise<Game>{

       return { id: 1, name: 'Gost', genre: 'Horror' };
    }
    @Mutation(() => Game)
async createGame(
  @Args('input1') createGameInput: CreateGameInput
): Promise<Game> {
  const newGame =this.gamesService.create(createGameInput)
  this.pubSub.publish('gameCreated1', {gameCreated: newGame})

  return newGame;
}
    @ResolveField(() => [Achievement])
    async achievements(@Parent() game: Game,
      @Args('offset', { type: () => Int, nullable: true }) offset?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
): Promise<Achievement[]> {
      console.log(game.id);
      
      return this.achievementsService.findByGameId(game.id, offset, limit);
    }


    @Query(()=>Game , { name: 'game' })
    async getGame(@Args('id', {type: ()=> Int}) id: number):Promise<Game>{
const game = this.games.find(game => game.id === id);
  if (!game) {
    throw new Error(`Game with id ${id} not found`);
  }
  return game;    }


  


  @Subscription(()=>Game, {
    name: 'gameCreated'
  })
  newGame(){
    return  this.pubSub.asyncIterableIterator('gameCreated1')
  }
}

    