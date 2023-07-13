import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class PermisoObject {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number
}
