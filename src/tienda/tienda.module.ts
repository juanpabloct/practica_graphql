import { Module } from '@nestjs/common';
import { TiendaResolver } from './tienda.resolver';
import { TiendaService } from './tienda.service';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), PrismaDbModule],
  providers: [TiendaResolver, TiendaService],
})
export class TiendaModule {}
