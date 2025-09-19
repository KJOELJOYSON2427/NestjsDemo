

import { InputType, Field, Int } from '@nestjs/graphql';
import { Difficulty } from './achievements.type';

@InputType()
export class CreateAchievementInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => Difficulty)
  difficulty: Difficulty;

  @Field(() => Int)
  gameId: number;   // ✅ connect achievement to a game
}
