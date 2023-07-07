import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserCreateWithoutRolAnduserInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create-without-rol-anduser.input';

@InputType()
export class CreateUserInput extends UserCreateWithoutRolAnduserInput {
  @Field(() => String, {
    description: 'Column for Rol',
    defaultValue: 'User',
    nullable: true,
  })
  @IsOptional()
  Rol: string;
}
