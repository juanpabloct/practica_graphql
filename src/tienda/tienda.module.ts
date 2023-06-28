import { Module } from '@nestjs/common';
import { TiendaResolver } from './tienda.resolver';
import { TiendaService } from './tienda.service';
import { Args, Mutation, Query } from '@nestjs/graphql';
import { NewTiendaInput, Tienda } from './inputs/tienda';

@Module({
  providers: [TiendaResolver, TiendaService],
})
export class TiendaModule {
  constructor(private readonly tiendaService: TiendaService) {}
  @Query(() => Tienda, { name: 'AllTiendas', description: 'Get all Tiendas' })
  tiendas() {
    return this.tiendaService.AllTiendas();
  }
  @Mutation(() => Tienda, {
    name: 'newShop',
    description: 'Add new Shop',
  })
  newTienda(@Args('newTienda') tienda: NewTiendaInput) {
    return this.tiendaService.addShop(tienda);
  }
}
