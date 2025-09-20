import { Injectable } from '@nestjs/common';
import { Hero } from './types/Hero.types';
import { Villain } from './types/Villian.types';
import { Character } from './types/Character.types';

@Injectable()
export class CharacterService {

     private heroes: Hero[] = [
    { name: 'Superman', power: 'Flight', weapon: 'Strength' },
  ];
  private villains: Villain[] = [
    { name: 'Lex Luthor', power: 'Genius', evilPlan: 'World Domination' },
  ];


  getCharacters(): Array<Character>{
    return [...this.heroes, ...this.villains];
  }

}
