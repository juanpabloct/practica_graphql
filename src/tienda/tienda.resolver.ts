import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewTiendaInput, TiendaSchema } from './inputs/tienda';
import { TiendaService } from './tienda.service';
import { Tienda } from '@prisma/client';

@Resolver()
export class TiendaResolver {
  constructor(private readonly tiendaService: TiendaService) {}
  @Query(() => [TiendaSchema], {
    name: 'AllTiendas',
    description: 'Get all Tiendas',
  })
  async tiendas() {
    return await this.tiendaService.getAllTiendas();
  }
  @Mutation(() => TiendaSchema, {
    name: 'newShop',
    description: 'Add new Shop',
  })
  async newTienda(@Args('newTienda') tienda: NewTiendaInput) {
    return await this.tiendaService.addShop(tienda);
  }
}
