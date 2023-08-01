import { Field, ObjectType, OmitType } from '@nestjs/graphql'
import { RolAnduserMinAggregate } from 'src/@generated/prisma-nestjs-graphql/rol-anduser/rol-anduser-min-aggregate.output'
import { RolMinAggregate } from 'src/@generated/prisma-nestjs-graphql/rol/rol-min-aggregate.output'
import { UserMinAggregate } from 'src/@generated/prisma-nestjs-graphql/user/user-min-aggregate.output'

@ObjectType()
class SingInWithoutPassword extends OmitType(UserMinAggregate, ['password']) {
}
@ObjectType()
export class SingOffObject extends RolAnduserMinAggregate {
    @Field(() => RolMinAggregate, {nullable:true})
    rol:RolMinAggregate
    @Field(() => SingInWithoutPassword, {nullable:true})
    User:SingInWithoutPassword
}