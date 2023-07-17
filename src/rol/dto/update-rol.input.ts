import { CreateRolInput } from './create-rol.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'
import { RolCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/rol/rol-create-without-roles-and-permisos.input'

@InputType()
export class UpdateRolInput extends PartialType(RolCreateWithoutRolesAndPermisosInput) {
	@Field(() => Int)
	@IsNumber()
	id: number
}
