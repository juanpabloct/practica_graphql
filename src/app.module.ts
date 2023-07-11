import { Module, forwardRef } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { CommonModule } from './common/common.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    //TiendaModule,
    forwardRef(async()=>(await import("./tienda/tienda.module")).TiendaModule),
    //ProductosModule,
    forwardRef(async()=>(await import("./productos/productos.module")).ProductosModule),
    //UserModule,
    forwardRef(async()=>(await import("./user/user.module")).UserModule),
    CommonModule,
    PrismaDbModule,
    //Module of the autentication
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
