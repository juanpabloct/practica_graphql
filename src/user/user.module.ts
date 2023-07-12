import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';

@Module({
	providers: [UserResolver, UserService],
	imports: [PrismaDbModule, forwardRef(() => CommonModule), forwardRef(() => AuthModule)],
	exports: [UserService],
})
export class UserModule {}
