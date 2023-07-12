import { ProductosResolver } from './productos.resolver';
import { ProductosService } from './productos.service';
import { Module } from '@nestjs/common';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
	providers: [ProductosResolver, ProductosService],
	imports: [PrismaDbModule],
})
export class ProductosModule {}
