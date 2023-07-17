import { CreateRolAndPermisoInput } from './create-rol-and-permiso.input'
import { Field, InputType, Int, PartialType } from '@nestjs/graphql'
import { IsNumber, IsString } from 'class-validator'

@InputType()
export class UpdateRolAndPermisoInput {
	@Field(() => String)
	@IsString()
	permiso: string

	@IsNumber()
	@Field(() => Int)
	id: number

	@Field(() => String)
	@IsString()
	rol: string
}
