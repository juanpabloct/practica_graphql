import { UpdateUserInput } from './dto/inputs/update-user.input'
import { Injectable, Logger, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) { }
	logger = new Logger()
	async findAll() {
		return this.prisma.user.findMany()
	}

	async findOne(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			}
		})
		if (user) {
			return user
		} else {
			this.ErrorUser({ message: 'User not Found' })
			throw new NotFoundException('User not Found')
		}
	}
	async findOneWithouthActive(id: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				active: true
			}
		})
		if (user) {
			return user
		} else {
			this.ErrorUser({ message: 'User not Found' })
			throw new NotFoundException('User not Found')
		}
	}

	async findForEmail(email: string) {
		try {
			return await this.prisma.user.findUniqueOrThrow({
				where: {
					email,
				},
				include: {
					RolAnduser: {
						include: {
							rol: {
								include: {
									RolesAndPermisos: {
										include: {
											Permiso: true,
											Rol: true
										}
									}
								}
							},
							User: true,
						},
					},
				},
			})
		} catch (error) {
			this.ErrorUser(error)
		}
	}

	async update(updateUser: UpdateUserInput) {
		return await this.prisma.user.update({
			where: { id: updateUser.id },
			data: updateUser,
		})
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
	ErrorUser(error) {
		this.logger.error(error.message)
	}
}
