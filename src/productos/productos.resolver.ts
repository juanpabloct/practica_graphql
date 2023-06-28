import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/products.entities';
import { ProductosService } from './productos.service';
import { NewProductInput } from './input/newProduct';

@Resolver()
export class ProductosResolver {
  constructor(private readonly productSevice: ProductosService) {}
  @Query(() => [Product], {
    name: 'Products',
    description: 'Get all Products',
  })
  allProducts(): Product[] {
    return this.productSevice.allProducts();
  }

  @Query(() => Product, {
    name: 'Product',
    description: 'Find product for id or name',
  })
  product(
    @Args('param', {
      type: () => Int || String,
      description: 'find one product for Id or Name',
    })
    param: number | string,
  ): Product {
    return this.productSevice.product(param);
  }

  @Mutation(() => Product, {
    name: 'NewProduct',
    description: 'Add new Product',
  })
  newProduct(@Args('NewProductInput') newValue: NewProductInput): Product {
    return this.productSevice.newProduct(newValue);
  }
}
