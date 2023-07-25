import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwtGuard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { CommonModule } from 'src/common/common.module';
import { PrismaDbModule } from 'src/prisma-db/prisma-db.module';
import { UserModule } from 'src/user/user.module';
import { RolesGuard } from './guards/roles.guard';
@Module({
	imports: [
		ConfigModule,

		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			global: true,
			secret: new ConfigService().get('JWT_SECRET'),
			signOptions: {
				expiresIn: "1d"
			}
		}),
		forwardRef(() => UserModule),
		CommonModule,
		PrismaDbModule,
	],
	providers: [AuthResolver, AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
	exports: [AuthResolver, AuthService, JwtStrategy, JwtAuthGuard, RolesGuard],
})
export class AuthModule { }
