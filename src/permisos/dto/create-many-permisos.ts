import { Field, InputType } from '@nestjs/graphql'
import { IsArray, IsString } from 'class-validator'

@InputType()
export class PermisoUser {
	@Field(() => String, { description: 'Name' })
	@IsString()
	name: string
}

@InputType()
export class CreateManyPermisosInput {
	@Field(() => [PermisoUser], { description: 'Array of permisos' })
	@IsArray()
	data: PermisoUser[]
}
