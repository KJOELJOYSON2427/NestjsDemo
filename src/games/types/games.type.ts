import { Field, Int, ObjectType, Resolver } from "@nestjs/graphql";
import { Achievement } from "src/achievements/types/achievements.type";



@ObjectType()
export class Game{
    @Field(()=>Int)
    id: number;
    

    @Field()
    name: string;
    @Field()
    genre: string;

    @Field(type => [Achievement], {nullable: true})
    achievements?: Achievement[];
}