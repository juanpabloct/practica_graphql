import { UpdateUserInput } from './dto/inputs/update-user.input'
import { BadRequestException, Injectable, Logger } from '@nestjs/common'

import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}
	logger = new Logger()
	async findAll() {
		return this.prisma.user.findMany({
			include: { _count: true },
		})
	}

	async findOne(id: number) {
		return this.prisma.user.findUniqueOrThrow({
			where: {
				id,
			},
			include: {
				_count: true,
			},
		})
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
							RolAndPermiso: true,
							User: true,
						},
					},
					_count: true,
				},
			})
		} catch (error) {
			this.ErrorUser(error)
			throw new BadRequestException({
				message: `Not fount user with email: ${email}`,
			})
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
