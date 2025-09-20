import { Query, Resolver } from '@nestjs/graphql';
import { CharacterService } from './character.service';
import { Character } from './types/Character.types';

@Resolver(() => Character)
export class CharacterResolver {
  constructor(private readonly characterService: CharacterService) {
  
  }
    @Query(() => [Character])
getCharacters(): Character[] {
  return this.characterService.getCharacters();
}


}
