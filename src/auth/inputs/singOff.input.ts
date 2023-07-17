import { Field, InputType, Int } from '@nestjs/graphql'
import { IsNumber } from 'class-validator'

@InputType()
export class SingOffInput {
	@Field(() => Int, {
		name: 'id',
	})
	@IsNumber()
	id: number
}
