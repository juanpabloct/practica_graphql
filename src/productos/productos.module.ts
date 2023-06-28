import { Module } from '@nestjs/common';
import { ProductosResolver } from './productos.resolver';
import { ProductosService } from './productos.service';

@Module({
  providers: [ProductosResolver, ProductosService],
})
export class ProductosModule {}
