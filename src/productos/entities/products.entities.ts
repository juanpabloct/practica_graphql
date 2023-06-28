import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsPositive, IsString } from 'class-validator';

@ObjectType()
export class Product {
  @Field(() => Int)
  idProducto: number;

  @Field(() => String)
  @IsString()
  name: string;
  @Field(() => Int)
  @IsNumber()
  @IsPositive()
  precio: number;
}
