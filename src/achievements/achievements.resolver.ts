import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AchievementsService } from './achievements.service';
import { Achievement } from './types/achievements.type';
import { CreateAchievementInput } from './types/CreateAchievement.types';

@Resolver()
export class AchievementsResolver {
  constructor(private readonly achievementsService: AchievementsService) {
    
   
  }
   @Mutation(()=>Achievement)
    createAchievements(@Args('input') input: CreateAchievementInput):Promise<Achievement>{
      
    }
}
