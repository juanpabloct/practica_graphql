import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RolObject {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number
}
