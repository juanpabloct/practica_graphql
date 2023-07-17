import { InputType, OmitType } from '@nestjs/graphql'
import { UserCreateWithoutRolAnduserInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create-without-rol-anduser.input'

@InputType()
export class SingInInput extends OmitType(UserCreateWithoutRolAnduserInput, ['active']) {}
