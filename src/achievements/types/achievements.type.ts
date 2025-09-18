import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";

export enum Difficulty{
    Easy ='Easy',
    MEDIUM ='Medium',
    HARD='Hard'
}


registerEnumType(Difficulty,{
    name:'Difficulty',
    description:'Difficulty levels for achievements'
})

@ObjectType()
export class Achievement {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true})
  description: string;

  @Field(type =>Difficulty)
  difficulty: Difficulty
}