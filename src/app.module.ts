import { Module, forwardRef } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    forwardRef(() =>
      import('./tienda/tienda.module').then((module) => module.TiendaModule),
    ),
    forwardRef(() =>
      import('./productos/productos.module').then(
        (module) => module.ProductosModule,
      ),
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
