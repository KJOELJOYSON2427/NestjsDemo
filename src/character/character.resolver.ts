import { Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { CharacterUnion } from './types/CharacterUnion.union';
import { Hero } from './types/Hero.types';
import { Villain } from './types/Villian.types';

@Resolver()
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {
  
  }
  private heroes: Hero[] = [{ name: 'Superman', power: 'Flight', weapon: 'Strength' }];
  private villains: Villain[] = [{ name: 'Lex Luthor', power: 'Genius', evilPlan: 'World Domination' }];


  @Query(() => [CharacterUnion])
  getCharacters(): Array<typeof CharacterUnion> {
    return [...this.heroes, ...this.villains];
  }
}
