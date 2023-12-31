import { Product } from './entities/products.entities'
import { NewProductInput } from './input/newProduct'
import { ProductosService } from './productos.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ProductosResolver {
	constructor(private readonly productSevice: ProductosService) {}
	@Query(() => [Product], {
		name: 'products',
		description: 'Get all Products',
	})
	allProducts() {
		return this.productSevice.allProducts()
	}

	@Query(() => Product, {
		name: 'product',
		description: 'Find product for id',
	})
	product(
		@Args('param', {
      type: () => Int || String,
      description: 'find one product for Id ',
    })
		id: number,
	) {
		return this.productSevice.product(id)
	}

	@Mutation(() => Product, {
		name: 'newProduct',
		description: 'Add new Product',
	})
	async newProduct(@Args('newProductInput') newValue: NewProductInput) {
		return await this.productSevice.newProduct(newValue)
	}
}
