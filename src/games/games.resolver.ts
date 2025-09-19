import { Args, ID, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Game } from "./types/games.type";
import { Achievement, Difficulty } from "src/achievements/types/achievements.type";
import { AchievementsService } from "src/achievements/achievements.service";
import { PaginatioArgs } from "./args/achievement.args";
import { CreateGameInput } from "./args/create-input.types";
import { GamesService } from "./games.service";

@Resolver(() => Game)
export class GamesResolver {
    constructor(private readonly achievementsService: AchievementsService,
      private readonly gamesService: GamesService
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
  return this.gamesService.create(createGameInput);
}
    @ResolveField(() => [Achievement])
    async achievements(@Parent() game: Game,
      @Args('offset', { type: () => Number, nullable: true }) offset?: number,
    @Args('limit', { type: () => Number, nullable: true }) limit?: number,
): Promise<Achievement[]> {
      console.log(game.id);
      
      return this.achievementsService.findByGameId(game.id, offset, limit);
    }
}

    