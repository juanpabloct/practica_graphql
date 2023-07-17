import { NewProductInput } from './input/newProduct'
import { Injectable } from '@nestjs/common'
import { Productos } from '@prisma/client'
import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class ProductosService {
	constructor(private readonly prisma: PrismaService) {}

	async allProducts(): Promise<Productos[]> {
		return this.prisma.productos.findMany()
	}

	async product(id: number): Promise<Productos> {
		return await this.prisma.productos.findUnique({
			where: {
				id,
			},
		})
	}

	async newProduct(product: NewProductInput): Promise<Productos> {
		const newProduct = await this.prisma.productos.create({
			data: {
				precio: product.precio,
				name: product.name,
			},
		})
		return newProduct
	}
}
