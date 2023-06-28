import { Module } from '@nestjs/common';
import { TiendaResolver } from './tienda.resolver';
import { TiendaService } from './tienda.service';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
  imports: [PrismaDbModule],
  providers: [TiendaResolver, TiendaService],
})
export class TiendaModule {}
