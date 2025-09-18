import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Game } from "./types/games.type";
import { Achievement, Difficulty } from "src/achievements/types/achievements.type";
import { AchievementsService } from "src/achievements/achievements.service";

@Resolver()
export class GamesResolver {
    constructor(private readonly achievementsService: AchievementsService) {}
    @Query(() => [Game], { name: 'games' })
    async getAll(): Promise<Game[]> {
      return [
        { id: 1, name: 'Gost', genre: 'Horror' },
        { id: 2, name: 'Mario', genre: 'Adventure' },
      ];
    }
  
    @ResolveField(() => [Achievement])
    async achievements(@Parent() game: Game): Promise<Achievement[]> {
      return this.achievementsService.findByGameId(game.id);
    }
}

    