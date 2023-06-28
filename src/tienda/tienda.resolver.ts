import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TiendaResolver {
  @Query(() => String, {
    name: 'tienda',
    description: 'Resolver que trae la informacion de la tienda',
  })
  Saluda(): string {
    return 'ghfghfghfgh';
  }
  @Query(() => Float, {
    name: 'Ramdom',
    description: 'Genera numeros aleatorios',
  })
  RandomNumber(
    @Args('to', { nullable: true, defaultValue: 10, type: () => Int })
    number: number,
  ): number {
    const { random, floor } = Math;
    return floor(random() * number);
  }
}
