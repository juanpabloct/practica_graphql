import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, MinLength } from 'class-validator';
@ObjectType()
export class TiendaSchema {
  @Field(() => String)
  name: string;
}
@InputType()
export class NewTiendaInput {
  @IsString()
  @MinLength(1)
  @Field(() => String)
  name: string;
}
