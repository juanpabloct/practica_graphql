import { BodegaTiendaProductoResolver } from './bodega-tienda-producto.resolver';
import { BodegaTiendaProductoService } from './bodega-tienda-producto.service';
import { Module } from '@nestjs/common';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
	providers: [BodegaTiendaProductoResolver, BodegaTiendaProductoService],
	imports: [PrismaDbModule],
})
export class BodegaTiendaProductoModule {}
