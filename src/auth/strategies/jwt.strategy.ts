import { JwtStratyegy } from '../interfaces/jwtStrategy'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		})
	}

	async validate(payload: JwtStratyegy) {
		const { email, RolAnduser, id } = payload
		const user = await this.userService.findOneWithouthActive(id)
		if (user.active) {
			return { id, email, RolAnduser }
		} else {
			throw new UnauthorizedException('User is not Authorized')
		}
	}
}
