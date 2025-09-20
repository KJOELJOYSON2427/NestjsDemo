import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterResolver } from './character.resolver';
import { CharacterInterfaceResolver } from './interface.Character.resolver';

@Module({
  providers: [CharacterResolver, CharacterService,CharacterInterfaceResolver],
})
export class CharacterModule {}
