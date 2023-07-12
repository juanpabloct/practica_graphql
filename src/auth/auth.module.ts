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
@Module({
	imports: [
		ConfigModule,

		PassportModule.register({ defaultStrategy: 'jwt' }),

		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.get('JWT_SECRET'),
				signOptions: {
					expiresIn: '1d',
				},
			}),
		}),

		forwardRef(() => UserModule),
		CommonModule,
		PrismaDbModule,
	],
	providers: [AuthResolver, AuthService, JwtStrategy, JwtAuthGuard],
	exports: [AuthResolver, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
