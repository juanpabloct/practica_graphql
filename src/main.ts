import { AppModule } from './app.module'
import { PrismaService } from './prisma-db/prisma-db.service'
import compression from '@fastify/compress'
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
declare const module
async function bootstrap() {
	const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
		}),
	)
	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)
	await app.register(compression, { encodings: ['br'], global: true, threshold: 300 })
	await app.listen(3000)
	if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}
bootstrap()
