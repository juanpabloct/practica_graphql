import { ObjectType, Field, Int, OmitType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';

@ObjectType()
export class UserWithoutPassword {
  @Field(() => Int, { description: 'ID of the user' })
  idUser: number;

  @Field(() => String, { description: 'Email of the user' })
  email: string;
}

@ObjectType()
export class UserObject extends UserWithoutPassword {
  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
@ObjectType()
export class Login extends OmitType(User, ['password']) {
  @Field(() => String, { description: 'return Token ' })
  @IsJWT()
  token: string;
}
