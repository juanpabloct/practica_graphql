import { Roles } from '@prisma/client'
import { CreateRolInput } from './dto/create-rol.input'
import { UpdateRolInput } from './dto/update-rol.input'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class RolService {
	constructor(private readonly prisma: PrismaService) { }
	entiti = this.prisma.rol
	async create({ name }: CreateRolInput) {
		const existRol = await this.findOneWithName(name)
		if (!existRol) {
			return this.entiti.create({ data: { name: name } })
		}
		else {
			throw new BadRequestException(`Rol ${name} already exist `)
		}

	}

	async findAll() {
		return this.entiti.findMany()
	}

	async findOne(id: number) {
		return this.entiti.findUnique({
			where: {
				id,
			},
		})
	}
	async findOneWithName(name: Roles) {
		return this.entiti.findUnique({
			where: {
				name
			},
		})
	}

	async update(id: number, { name }: UpdateRolInput) {
		return this.entiti.update({
			where: { id },
			data: {
				name,
			},
		})
	}

	async remove(id: number) {
		return this.entiti.delete({
			where: { id },
			include: {
				RolesAndPermisos: true,
			},
		})
	}
}
