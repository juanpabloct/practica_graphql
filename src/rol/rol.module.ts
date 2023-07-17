import { RolResolver } from './rol.resolver'
import { RolService } from './rol.service'
import { Module } from '@nestjs/common'
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module'

@Module({
	providers: [RolResolver, RolService],
	imports: [PrismaDbModule],
})
export class RolModule {}
