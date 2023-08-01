import { Field, InputType } from '@nestjs/graphql'
import { IsArray } from 'class-validator'
import { Permisions } from 'src/@generated/prisma-nestjs-graphql/prisma/permisions.enum'

@InputType()
export class CreateManyPermisosInput {
	@Field(() => [Permisions], { description: 'Array of permisos' })
	@IsArray()
	data: Permisions[]
}
