import { Module, forwardRef } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    forwardRef(
      async () =>
        await import('./tienda/tienda.module').then(
          (module) => module.TiendaModule,
        ),
    ),
    forwardRef(
      async () =>
        await import('./productos/productos.module').then(
          (module) => module.ProductosModule,
        ),
    ),
    forwardRef(
      async () =>
        await import('./prisma-db/prisma-db.module').then(
          (module) => module.PrismaDbModule,
        ),
    ),
    forwardRef(
      async () =>
        await import('./user/user.module').then((module) => module.UserModule),
    ),
    forwardRef(
      async () =>
        await import('./common/common.module').then(
          (module) => module.CommonModule,
        ),
    ),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
