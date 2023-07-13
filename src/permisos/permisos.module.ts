import { PermisosResolver } from './permisos.resolver'
import { PermisosService } from './permisos.service'
import { Module } from '@nestjs/common'
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module'

@Module({
	providers: [PermisosResolver, PermisosService],
	imports: [PrismaDbModule],
})
export class PermisosModule {}
