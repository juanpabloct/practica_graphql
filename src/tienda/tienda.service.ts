import { Injectable } from '@nestjs/common';
import { NewTiendaInput } from './inputs/tienda';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { Tienda } from 'prisma/prisma-client';

@Injectable()
export class TiendaService {
  constructor(private readonly prisma: PrismaService) {}

  async addShop(newShop: NewTiendaInput): Promise<Tienda> {
    const dataCreate = await this.prisma.tienda.create({
      data: {
        name: newShop.name, // Corregir el nombre del campo
      },
    });
    return dataCreate;
  }

  async getAllTiendas(): Promise<Tienda[]> {
    // Corregir el nombre del método
    return this.prisma.tienda.findMany();
  }
}
