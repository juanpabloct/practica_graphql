import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum';

@InputType()
export class CreateRolInput {
  @Field(() => Roles, { description: 'field rol' })
  @IsNotEmpty()
  name: Roles;
}
