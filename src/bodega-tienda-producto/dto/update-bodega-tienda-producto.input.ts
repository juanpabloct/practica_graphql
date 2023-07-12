import { CreateBodegaTiendaProductoInput } from './create-bodega-tienda-producto.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBodegaTiendaProductoInput extends PartialType(CreateBodegaTiendaProductoInput) {
	@Field(() => Int)
	id: number;
}
