import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AchievementsService } from './achievements.service';
import { Achievement } from './types/achievements.type';
import { CreateAchievementInput } from './types/CreateAchievement.types';

@Resolver()
export class AchievementsResolver {
  constructor(private readonly achievementsService: AchievementsService) {
    
   
  }
   @Mutation(()=>Achievement)
    async createAchievement(@Args('input') input: CreateAchievementInput):Promise<Achievement>{
      return await  this.achievementsService.create(input);
    }

    @Query(()=>[Achievement], {name:"Achievements"})
    async findAll():Promise<Achievement[]>{
      return this.achievementsService.findAll()
    }
}
