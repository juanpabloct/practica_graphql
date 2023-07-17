import { SingInInput } from './inputs/sing-in.input'
import { BadRequestException, Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RolAnduser } from 'src/@generated/prisma-nestjs-graphql/rol-anduser/rol-anduser.model'
import { CreateUserInput } from 'src/auth/inputs/create-user.input'
import { EncryptPaswordService } from 'src/common/encryptPassword.service'
import { PrismaService } from 'src/prisma-db/prisma-db.service'
import { UserService } from 'src/user/user.service'
@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly passwordService: EncryptPaswordService,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly jwt: JwtService,
	) {}
	entiti = this.prisma.rolAnduser
	logger = new Logger()

	async SingUp({ Rol, email, password }: CreateUserInput): Promise<RolAnduser> {
		try {
			const newUser = await this.entiti.create({
				data: {
					User: {
						create: {
							email,
							password,
						},
					},
					rol: {
						connectOrCreate: {
							create: {
								name: Rol,
							},
							where: {
								name: Rol,
							},
						},
					},
				},
				include: {
					rol: true,
					User: true,
				},
			})
			return newUser
		} catch (error) {
			throw new BadRequestException({ message: error.message })
		}
	}
	async SingIn({ email, password }: SingInInput) {
		try {
			const { password: passwordEmail, ...infoUser } = await this.userService.findForEmail(email)
			if (!infoUser.active) {
				const { active } = await this.prisma.user.update({
					data: {
						active: true,
					},
					where: {
						id: infoUser.id,
					},
					select: {
						active: true,
					},
				})
				infoUser.active = active
			}
			const validatePassword = await this.passwordService.EqualPassword(password, passwordEmail)
			if (validatePassword) {
				const tokenGenerate = this.jwt.sign(infoUser)
				return { password: passwordEmail, ...infoUser, token: tokenGenerate }
			} else {
				throw new BadRequestException('Credentiasl are incorrects')
			}
		} catch (error) {
			this.ErrorLogin(error)
			return error
		}
	}
	async signOff(id: number) {
		const user = await this.userService.findOne(id)
		if (user?.active) {
			const updateData = this.entiti.update({
				where: {
					id,
				},
				data: {
					User: {
						update: {
							active: false,
						},
					},
				},
				include: {
					rol: true,
					User: true,
				},
			})
			return updateData
		} else if (user) {
			return user
		} else {
			throw new NotFoundException("user doesn't exist")
		}
	}
	ErrorLogin(error: Error) {
		this.logger.error(error.message)
	}
	async validateUser(id: number) {
		return this.userService.findOne(id)
	}
}
