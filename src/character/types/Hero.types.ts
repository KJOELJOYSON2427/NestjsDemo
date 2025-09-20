import { Field, ObjectType } from "@nestjs/graphql";






@ObjectType()
export class Hero  {
  
  @Field()
  name: string;

  @Field()
  power: string;

  @Field()
  weapon: string;

  
}