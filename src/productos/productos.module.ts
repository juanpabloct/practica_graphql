import { Module } from '@nestjs/common';
import { ProductosResolver } from './productos.resolver';
import { ProductosService } from './productos.service';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  providers: [ProductosResolver, ProductosService],
  imports: [PrismaDbModule],
})
export class ProductosModule {}
