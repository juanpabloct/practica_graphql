import { Field, InputType, Int } from '@nestjs/graphql';
import { IsJWT, IsNumber } from 'class-validator';
import { CreateUserInput } from './create-user.input';

@InputType()
export class SingInInput extends CreateUserInput {
  @Field(() => String, { description: 'return Token ' })
  @IsJWT()
  token: string;
  @Field(() => Int, { description: 'return Token ' })
  @IsNumber()
  id: number;
}
