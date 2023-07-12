import { BadRequestException, Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { SingInInput } from './inputs/sing-in.input';
import { RolAnduser } from 'src/@generated/prisma-nestjs-graphql/rol-anduser/rol-anduser.model';
import { CreateUserInput } from 'src/auth/inputs/create-user.input';
import { EncryptPaswordService } from 'src/common/encryptPassword.service';
import { PrismaService } from 'src/prisma-db/prisma-db.service';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly passwordService: EncryptPaswordService,
		@Inject(forwardRef(() => UserService))
		private readonly userService: UserService,
		private readonly jwt: JwtService,
	) {}
	logger = new Logger();

	async SingUp({ Rol, email, password }: CreateUserInput): Promise<RolAnduser> {
		try {
			const newUser = await this.prisma.rolAnduser.create({
				data: {
					User: {
						create: {
							email,
							password,
						},
					},
					RolAndPermiso: {
						create: {
							Rol: {
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
					},
				},
				include: {
					User: true,
					RolAndPermiso: {
						include: {
							Permiso: true,
							Rol: true,
							_count: true,
						},
					},
				},
			});
			return newUser;
		} catch (error) {
			throw new BadRequestException({ message: error.message });
		}
	}
	async SingIn({ email, password }: SingInInput) {
		try {
			const { password: passwordEmail, ...infoUser } = await this.userService.findForEmail(email);
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
				});
				infoUser.active = active;
			}
			const validatePassword = await this.passwordService.EqualPassword(password, passwordEmail);
			if (validatePassword) {
				const tokenGenerate = this.jwt.sign(infoUser);
				return { password: passwordEmail, ...infoUser, token: tokenGenerate };
			} else {
				throw new BadRequestException('Credentiasl are incorrects');
			}
		} catch (error) {
			this.ErrorLogin(error);
			return error;
		}
	}
	ErrorLogin(error: Error) {
		this.logger.error(error.message);
	}
	async validateUser(id: number) {
		return this.userService.findOne(id);
	}
}
