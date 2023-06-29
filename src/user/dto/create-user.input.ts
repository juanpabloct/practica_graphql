import { InputType, Field } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsString, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Column for email' })
  @IsString()
  @Transform(({ value }) => value.toLowerCase())
  email: string;
  @Field(() => String, { description: 'Column for Password' })
  @IsString()
  @MinLength(4)
  password: string;
}
