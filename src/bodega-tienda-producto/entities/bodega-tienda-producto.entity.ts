import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BodegaTiendaProducto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
