import { ObjectType, Field } from '@nestjs/graphql';
import { Character } from './Character.types';


@ObjectType({
    implements:()=> Character
})
export class Villain implements Character {
  @Field()
  name: string;

  @Field()
  power: string;

  @Field()
  evilPlan: string;

    @Field(()=>[Character]!, { nullable: true })
  friends?: Character[];
}