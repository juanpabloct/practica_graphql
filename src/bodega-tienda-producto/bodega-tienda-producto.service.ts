import { PrismaService } from '../prisma-db/prisma-db.service';
import { CreateBodegaTiendaProductoInput } from './dto/create-bodega-tienda-producto.input';
import { UpdateBodegaTiendaProductoInput } from './dto/update-bodega-tienda-producto.input';
import { Injectable, Logger } from '@nestjs/common';
import { Info } from '@nestjs/graphql';
import { BodegaTiendaProducto } from '@prisma/client';
import { BodegaTiendaProductoAvgAggregateInput } from 'src/@generated/prisma-nestjs-graphql/bodega-tienda-producto/bodega-tienda-producto-avg-aggregate.input';
import { BodegaTiendaProductoMaxAggregate } from 'src/@generated/prisma-nestjs-graphql/bodega-tienda-producto/bodega-tienda-producto-max-aggregate.output';

@Injectable()
export class BodegaTiendaProductoService {
	constructor(private prisma: PrismaService) {}
	logger = new Logger();

	entidad = this.prisma.bodegaTiendaProducto;
	async create({ bodega, cantidad, nameProduct, tienda }: CreateBodegaTiendaProductoInput) {
		try {
			const findProducto = await this.prisma.productos.findUniqueOrThrow({
				where: {
					name: nameProduct,
				},
				select: {
					idProducto: true,
				},
			});
			const findTienda = await this.prisma.tienda.findUniqueOrThrow({
				where: {
					name: tienda,
				},
				select: {
					id: true,
				},
			});
			const findBodega = await this.prisma.bodega.findUniqueOrThrow({
				where: {
					name: bodega,
				},
				select: {
					id: true,
				},
			});
			return this.entidad.create({
				data: {
					bodegaId: findBodega.id,
					cantidad,
					fkProducto: findProducto.idProducto,
					fkTienda: findTienda.id,
				},
			});
		} catch (error) {
			this.error(error);
		}
	}

	async findAll() {
		return this.entidad.findMany();
	}

	async findOne(id: number) {
		return this.entidad.findUnique({
			where: {
				id,
			},
		});
	}

	update(id: number, updateBodegaTiendaProductoInput: UpdateBodegaTiendaProductoInput) {
		return `This action updates a #${id} bodegaTiendaProducto`;
	}

	remove(id: number) {
		return `This action removes a #${id} bodegaTiendaProducto`;
	}

	error(error) {
		return this.logger.error(error);
	}
}
