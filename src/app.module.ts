import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { join } from 'path';
import { TiendaModule } from './tienda/tienda.module';
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
    TiendaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
