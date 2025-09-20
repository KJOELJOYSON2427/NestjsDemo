import { createUnionType } from "@nestjs/graphql";
import { Hero } from "./Hero.types";
import { Villain } from "./Villian.types";

 export const CharacterUnion =createUnionType({
    name:'Characterunion',
    types:()=> [Hero, Villain] as const,
     resolveType(value) {
    if ('weapon' in value) return Hero;
    if ('evilPlan' in value) return Villain;
    return null;
  },

 })