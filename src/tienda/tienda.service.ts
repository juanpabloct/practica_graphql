import { Injectable } from '@nestjs/common';
import { NewTiendaInput, Tienda } from './inputs/tienda';

@Injectable()
export class TiendaService {
  private tiendas: Tienda[] = [];
  addShop(newShop: NewTiendaInput) {
    this.tiendas.push(newShop);
    return newShop;
  }
  AllTiendas() {
    return this.tiendas;
  }
}
