import { Injectable } from '@nestjs/common';

import { Achievement } from './types/achievements.type';
import { Difficulty } from './types/achievements.type';
import { CreateAchievementInput } from './types/CreateAchievement.types';

@Injectable()
export class AchievementsService {
  private currentId = 1;
  private achievements: Achievement[] = [
    { id: 1, gameId: 1, title: 'First Kill', description: 'Defeated your first ghost.', difficulty: Difficulty.Easy },
    { id: 2, gameId: 1, title: 'Survivor', description: 'Completed the level without dying.', difficulty: Difficulty.MEDIUM },
    { id: 3, gameId: 2, title: 'First Jump', description: 'Jumped over your first obstacle.', difficulty: Difficulty.Easy },
    { id: 4, gameId: 2, title: 'Coin Collector', description: 'Collected 100 coins.', difficulty: Difficulty.MEDIUM },
  ];
  create(data: CreateAchievementInput): Achievement {
    const newAchievement: Achievement = {
      id: this.currentId++,
      title: data.title,
      description: data.description,
      difficulty: data.difficulty,
      gameId:data.gameId
      
    };

    this.achievements.push(newAchievement);
    return newAchievement;
  }
  findByGameId(gameId: number,offset = 0, limit = 10): Achievement[] {
    return this.achievements
      .filter(a => a.gameId === gameId)
      .slice(offset, offset + limit);
  }

  async findAll(){
    return await this.achievements;
  }
  }

