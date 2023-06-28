import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewTiendaInput, Tienda } from './inputs/tienda';
import { TiendaService } from './tienda.service';

@Resolver()
export class TiendaResolver {
  constructor(private readonly tiendaService: TiendaService) {}
  @Query(() => [Tienda], { name: 'AllTiendas', description: 'Get all Tiendas' })
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
