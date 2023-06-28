import { Injectable } from '@nestjs/common';
import { NewProductInput } from './input/newProduct';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Productos } from '@prisma/client';

@Injectable()
export class ProductosService {
  constructor(private readonly prisma: PrismaService) {}

  async allProducts(): Promise<Productos[]> {
    return this.prisma.productos.findMany();
  }

  async product(id: number): Promise<Productos> {
    return await this.prisma.productos.findUnique({
      where: {
        idProducto: id,
      },
    });
  }

  async newProduct(product: NewProductInput): Promise<Productos> {
    const newProduct = await this.prisma.productos.create({
      data: {
        precio: product.precio,
        name: product.name,
      },
    });
    return newProduct;
  }
}
