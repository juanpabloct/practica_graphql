import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class NewProductInput {
  @Field(() => String)
  name: string;

  @Field(() => Int)
  id: number;
}
