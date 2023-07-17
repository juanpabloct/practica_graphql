import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class RolAndPermisoObject {
	@Field(() => Int, { description: 'Example field (placeholder)' })
	exampleField: number
}
