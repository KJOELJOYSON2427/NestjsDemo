import { Field, ObjectType } from "@nestjs/graphql";
import { Character } from "./Character.types";






@ObjectType({
    implements:()=> Character
})
export class Hero implements Character {
  
  @Field()
  name: string;

  @Field()
  power: string;

  @Field()
  weapon: string;

  @Field(()=>[Character] , { nullable: true })
  friends?: Character[];
}