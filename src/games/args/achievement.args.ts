import { ArgsType, Field, Int } from "@nestjs/graphql";


@ArgsType()
export class PaginatioArgs{
    
    @Field(() => Int, { nullable: true, defaultValue: 0 })
  offset?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  limit?: number;
}