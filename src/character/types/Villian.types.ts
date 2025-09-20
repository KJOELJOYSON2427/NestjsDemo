import { ObjectType, Field } from '@nestjs/graphql';



@ObjectType()
export class Villain {
  @Field()
  name: string;

  @Field()
  power: string;

  @Field()
  evilPlan: string;

   
}