import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateGameInput{
    @Field(() => String)
  name: string;

  @Field(() => String)
  genre: string;
}