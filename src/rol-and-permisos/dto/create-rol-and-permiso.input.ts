import { Field, InputType } from '@nestjs/graphql'
import { ArrayMinSize, IsArray, IsString, MinLength } from 'class-validator'
import { Permisions } from 'src/@generated/prisma-nestjs-graphql/prisma/permisions.enum'
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum'

@InputType()
export class CreateRolAndPermisoInput {
	@Field(() => [String])
	@IsArray()
	@ArrayMinSize(0)
	permisos: Permisions[]

	@Field(() => String)
	@MinLength(1)
	rol: keyof typeof Roles
}
@InputType()
export class CreateRolAndPermisoOneInput {
	@Field(() => String)
	@IsString()
	permiso: keyof typeof Permisions

	@Field(() => String)
	@MinLength(1)
	rol: keyof typeof Roles
}
