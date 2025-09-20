import { Field, InterfaceType } from "@nestjs/graphql";
import { Hero } from "./Hero.types";
import { Villain } from "./Villian.types";




@InterfaceType(
   
    {
      resolveType: (value) => {
        console.log('resolveType called for:', value);

    if ('weapon' in value) return Hero;
    if ('evilPlan' in value) return Villain;
    
    return null;
  },
         isAbstract:true
    }
)
export abstract class Character{
    @Field()
    name: string;

    @Field()
    power: string;


    @Field(()=>[Character], { nullable: true })
    friends?: Character[];
}