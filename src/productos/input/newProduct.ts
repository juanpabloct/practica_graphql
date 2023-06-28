import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@InputType()
export class NewProductInput {
  @IsString()
  @Field(() => String)
  name: string;
  @IsNumber()
  @IsPositive()
  @Field(() => Int)
  precio: number;
}
