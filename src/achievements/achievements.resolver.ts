import { Resolver } from '@nestjs/graphql';
import { AchievementsService } from './achievements.service';

@Resolver()
export class AchievementsResolver {
  constructor(private readonly achievementsService: AchievementsService) {
    
  }
}
