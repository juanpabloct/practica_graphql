import { Module } from "@nestjs/common";
import { BodegaTiendaProductoService } from "./bodega-tienda-producto.service";
import { BodegaTiendaProductoResolver } from "./bodega-tienda-producto.resolver";
import { PrismaDbModule } from "src/prisma-db/prisma-db.module";

@Module({
	providers: [BodegaTiendaProductoResolver, BodegaTiendaProductoService],
	imports: [PrismaDbModule],
})
export class BodegaTiendaProductoModule {}
