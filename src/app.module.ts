import { Module, forwardRef } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProductosModule } from './productos/productos.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TiendaModule } from './tienda/tienda.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    TiendaModule,
    ProductosModule,
    UserModule,
    CommonModule,
    PrismaDbModule,

    //Module of the autentication
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
