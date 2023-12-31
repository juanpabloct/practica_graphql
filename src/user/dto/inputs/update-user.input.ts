import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNumber, IsOptional, IsPositive, IsString, MinLength } from 'class-validator';

@InputType()
export class UpdateUserInput {
	@Field(() => Int)
	@IsNumber()
	@IsPositive()
	id: number;

	@Field(() => String, { nullable: true })
	@IsEmail()
	@IsOptional()
	email?: string;

	@Field(() => String, { nullable: true })
	@MinLength(6)
	@IsString()
	@IsOptional()
	password?: string;
}
