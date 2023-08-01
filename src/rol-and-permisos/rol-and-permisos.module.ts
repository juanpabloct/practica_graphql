import { PermisosModule } from 'src/permisos/permisos.module'
import { RolAndPermisosResolver } from './rol-and-permisos.resolver'
import { RolAndPermisosService } from './rol-and-permisos.service'
import { Module } from '@nestjs/common'
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module'

@Module({
	providers: [RolAndPermisosResolver, RolAndPermisosService],
	imports: [PrismaDbModule, PermisosModule],
})
export class RolAndPermisosModule { }
