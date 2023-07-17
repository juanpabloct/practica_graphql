import { ObjectType, OmitType } from '@nestjs/graphql'
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model'

@ObjectType()
export class SingOffObject extends OmitType(User, ['password']) {}
