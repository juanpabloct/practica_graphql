import { PrismaService } from './prisma-db.service';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
@Module({
	providers: [PrismaClient, PrismaService],
	exports: [PrismaClient, PrismaService],
})
export class PrismaDbModule {}
