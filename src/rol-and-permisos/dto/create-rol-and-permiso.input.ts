import { Field, InputType } from '@nestjs/graphql'
import { ArrayMinSize, IsArray, IsString, MinLength } from 'class-validator'
import { Permisions } from 'src/@generated/prisma-nestjs-graphql/prisma/permisions.enum'
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum'

@InputType()
export class CreateRolAndPermisoInput {
	@Field(() => [Permisions])
	@IsArray()
	@ArrayMinSize(0)
	permisos: Permisions[]

	@Field(() => Roles)
	@MinLength(1)
	rol: keyof typeof Roles
}
@InputType()
export class CreateRolAndOnePermisoInput {
	@Field(() => Permisions)
	@IsString()
	permiso: Permisions

	@Field(() => Roles)
	@MinLength(1)
	rol: Roles
}
