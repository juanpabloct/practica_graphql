import { Field, InputType, OmitType } from '@nestjs/graphql'
import { IsOptional } from 'class-validator'
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum'
import { UserCreateWithoutRolAnduserInput } from 'src/@generated/prisma-nestjs-graphql/user/user-create-without-rol-anduser.input'

@InputType()
export class CreateUserInput extends OmitType(UserCreateWithoutRolAnduserInput, ['active']) {
	@Field(() => String, {
		description: 'Column for Rol',
		defaultValue: 'User',
		nullable: true,
	})
	@IsOptional()
	Rol?: keyof typeof Roles
}
