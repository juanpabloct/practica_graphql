import { ObjectType, Field, OmitType, PartialType } from '@nestjs/graphql';
import { IsJWT } from 'class-validator';
import { UserMinAggregate } from 'src/@generated/prisma-nestjs-graphql/user/user-min-aggregate.output';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';

@ObjectType()
export class UserWithoutPassword extends PartialType(OmitType(UserMinAggregate, ["password"])) { }

@ObjectType()
export class UserObject extends PartialType(UserWithoutPassword) {
  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
@ObjectType()
export class Login extends PartialType(OmitType(User, ['password'])) {
  @Field(() => String, { description: 'return Token ' })
  @IsJWT()
  token: string;
}
