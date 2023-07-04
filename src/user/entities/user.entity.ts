import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsJWT, IsNumber } from 'class-validator';

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
@ObjectType()
export class Login extends User {
  @Field(() => String, { description: 'return Token ' })
  @IsJWT()
  token: string;
  @Field(() => Int, { description: 'return Token ' })
  @IsNumber()
  idUser: number;
}
