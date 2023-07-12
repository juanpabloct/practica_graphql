import { AuthModule } from './auth/auth.module';
import { PrismaDbModule } from './prisma-db/prisma-db.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
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
		forwardRef(async () => (await import('./tienda/tienda.module')).TiendaModule),
		//ProductosModule,
		forwardRef(async () => (await import('./productos/productos.module')).ProductosModule),
		//UserModule,
		forwardRef(async () => (await import('./user/user.module')).UserModule),
		//CommonModule,
		forwardRef(async () => (await import('./common/common.module')).CommonModule),
		PrismaDbModule,
		//Module of the autentication
		AuthModule,
		forwardRef(
			async () => (await import('./bodega-tienda-producto/bodega-tienda-producto.module')).BodegaTiendaProductoModule,
		),
		//BodegaTiendaProductoModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
