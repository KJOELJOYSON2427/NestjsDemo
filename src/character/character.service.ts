import { Injectable } from '@nestjs/common';
import { Hero } from './types/Hero.types';
import { Villain } from './types/Villian.types';

@Injectable()
export class CharacterService {

     private heroes: Hero[] = [
    { name: 'Superman', power: 'Flight', weapon: 'Strength' },
  ];
  private villains: Villain[] = [
    { name: 'Lex Luthor', power: 'Genius', evilPlan: 'World Domination' },
  ];


 

}
