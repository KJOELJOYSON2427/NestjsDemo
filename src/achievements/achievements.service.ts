import { Injectable } from '@nestjs/common';

import { Achievement } from './types/achievements.type';
import { Difficulty } from './types/achievements.type';

@Injectable()
export class AchievementsService {
  private achievements: Achievement[] = [
    { id: 1, title: 'First Kill', description: 'Defeated your first ghost.', difficulty: Difficulty.Easy },
    { id: 2, title: 'Survivor', description: 'Completed the level without dying.', difficulty: Difficulty.MEDIUM },
    { id: 3, title: 'First Jump', description: 'Jumped over your first obstacle.', difficulty: Difficulty.Easy },
    { id: 4, title: 'Coin Collector', description: 'Collected 100 coins.', difficulty: Difficulty.MEDIUM},
  ];

  findByGameId(gameId: number): Achievement[] {
    return this.achievements.filter(a => a.id === gameId);
  }
}
