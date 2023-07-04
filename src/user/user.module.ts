import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';
import { CommonModule } from 'src/common/common.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [UserResolver, UserService],
  imports: [
    PrismaDbModule,
    forwardRef(() => CommonModule),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
