import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [PrismaDbModule, CommonModule],
})
export class UserModule {}
