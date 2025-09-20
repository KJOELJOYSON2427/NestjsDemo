import { Resolver, ResolveField, Parent, Info } from '@nestjs/graphql';
import { Character } from './types/Character.types';
import type { GraphQLResolveInfo } from 'graphql';


@Resolver(() => Character)
export class CharacterInterfaceResolver {
  @ResolveField(() => [Character], { nullable: true },
   
)
  friends(@Parent() character: any, @Info() info: GraphQLResolveInfo   ) {
    console.log('friends resolver called for:', character);
    console.log('Query fields:', info.fieldNodes[0].selectionSet?.selections.map(s=>s.loc));

    if ('weapon' in character) return  [{ name: 'Batman', power: 'Tech', weapon: 'Batarang' }]; 
    if ('evilPlan' in character) return [{ name: 'Joker', power: 'Chaos' , evilPlan: 'Take over Gotham'}];
    return [];
  }
}


