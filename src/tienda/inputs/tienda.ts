import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Min, MinLength } from 'class-validator';
@ObjectType()
export class Tienda {
  @Field(() => String)
  tienda: string;
}
@InputType()
export class NewTiendaInput {
  @IsString()
  @MinLength(1)
  @Field(() => String)
  tienda: string;
}
