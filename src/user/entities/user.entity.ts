import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserWithoutPassword {
  @Field(() => Int, { description: 'ID of the user' })
  idUser: number;

  @Field(() => String, { description: 'Email of the user' })
  email: string;
}

@ObjectType()
export class User extends UserWithoutPassword {
  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
