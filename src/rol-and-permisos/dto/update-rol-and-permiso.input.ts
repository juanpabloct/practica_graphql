import { CreateRolAndPermisoInput, CreateRolAndPermisoOneInput } from './create-rol-and-permiso.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum'

@InputType()
export class UpdateRolAndPermisoInput extends PartialType(CreateRolAndPermisoOneInput) {
	@IsNumber()
	@Field(() => Int)
	id: number
}
