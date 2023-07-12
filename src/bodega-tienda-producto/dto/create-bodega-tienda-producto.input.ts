import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBodegaTiendaProductoInput {
	@IsString()
	@Field(() => String)
	nameProduct: string;
	@IsString()
	@Field(() => String)
	bodega: string;
	@IsString()
	@Field(() => String)
	tienda: string;
	@IsNumber()
	@Field(() => Number)
	cantidad: number;
}
