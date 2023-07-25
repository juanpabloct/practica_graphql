import { Field, InputType } from '@nestjs/graphql'
import { Permisions } from '@prisma/client'
import { IsArray } from 'class-validator'

@InputType()
export class CreateManyPermisosInput {
	@Field(() => [String], { description: 'Array of permisos' })
	@IsArray()
	data: Permisions[]
}
