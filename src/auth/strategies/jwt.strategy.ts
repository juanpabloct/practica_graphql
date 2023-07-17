import { PayloadToken } from './interfaces/tokenDesencrypt'
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private User: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate(payload: PayloadToken) {
		const { active } = await this.User.findOne(payload.id)
		if (active) {
			return { userId: payload.id, email: payload.email, rol: payload.RolAnduser[0].rol.name }
		} else {
			throw new UnauthorizedException('User is not Autorizd ')
		}
	}
}
