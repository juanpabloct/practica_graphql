import { CreateRolInput } from './dto/create-rol.input'
import { UpdateRolInput } from './dto/update-rol.input'
import { Injectable } from '@nestjs/common'
import { RolCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/rol/rol-create-without-roles-and-permisos.input'
import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class RolService {
	constructor(private readonly prisma: PrismaService) { }
	entiti = this.prisma.rol
	async create(name: string) {
		return this.entiti.create({ data: { name } })
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
