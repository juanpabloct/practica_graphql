import { Injectable } from '@nestjs/common';
import { Product } from './entities/products.entities';
import { NewProductInput } from './input/newProduct';

@Injectable()
export class ProductosService {
  private fruits = [
    { name: 'platano', id: 1 },
    { name: 'Papa', id: 2 },
    { name: 'yuca', id: 3 },
  ];
  allProducts(): Product[] {
    return this.fruits;
  }

  product(param: number | string): Product {
    return this.fruits.find(
      (fruit) => fruit.id === param || fruit.name === param,
    );
  }
  newProduct(product: NewProductInput): Product {
    this.fruits.push(product);
    return product;
  }
}
