import { Field, InputType } from '@nestjs/graphql'
import { ArrayMinSize, IsArray, IsString, MinLength } from 'class-validator'

@InputType()
export class CreateRolAndPermisoInput {
	@Field(() => [String])
	@IsArray()
	@ArrayMinSize(0)
	permisos: string[]

	@Field(() => String)
	@MinLength(1)
	name: string
}
@InputType()
export class CreateRolAndPermisoOneInput {
	@Field(() => String)
	@IsString()
	permiso: string

	@Field(() => String)
	@MinLength(1)
	name: string
}
