import { BodegaTiendaProductoService } from './bodega-tienda-producto.service';
import { CreateBodegaTiendaProductoInput } from './dto/create-bodega-tienda-producto.input';
import { UpdateBodegaTiendaProductoInput } from './dto/update-bodega-tienda-producto.input';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BodegaTiendaProducto } from 'src/@generated/prisma-nestjs-graphql/bodega-tienda-producto/bodega-tienda-producto.model';
@Resolver(() => BodegaTiendaProducto)
export class BodegaTiendaProductoResolver {
	constructor(private readonly bodegaTiendaProductoService: BodegaTiendaProductoService) {}
	@Mutation(() => BodegaTiendaProducto)
	createBodegaTiendaProducto(
		@Args('createBodegaTiendaProductoInput') createBodegaTiendaProductoInput: CreateBodegaTiendaProductoInput,
	) {
		return this.bodegaTiendaProductoService.create(createBodegaTiendaProductoInput);
	}

	@Query(() => [BodegaTiendaProducto], {
		name: 'bodegasTiendasProductos',
	})
	findAll() {
		return this.bodegaTiendaProductoService.findAll();
	}
	@Query(() => BodegaTiendaProducto, {
		name: 'bodegaTiendaProducto',
	})
	findOne(
		@Args('id', { type: () => Int }) id: number,
	) {
		return this.bodegaTiendaProductoService.findOne(id);
	}

	@Mutation(() => BodegaTiendaProducto)
	updateBodegaTiendaProducto(
		@Args('updateBodegaTiendaProductoInput') updateBodegaTiendaProductoInput: UpdateBodegaTiendaProductoInput,
	) {
		return this.bodegaTiendaProductoService.update(updateBodegaTiendaProductoInput.id, updateBodegaTiendaProductoInput);
	}

	@Mutation(() => BodegaTiendaProducto)
	removeBodegaTiendaProducto(@Args('id', { type: () => Int }) id: number) {
		return this.bodegaTiendaProductoService.remove(id);
	}
}
