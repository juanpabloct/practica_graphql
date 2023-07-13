import { CreateManyPermisosInput } from './dto/create-many-permisos'
import { UpdatePermisoInput } from './dto/update-permiso.input'
import { Injectable } from '@nestjs/common'
import { PermisoCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-create-without-roles-and-permisos.input'
import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class PermisosService {
	constructor(private readonly prisma: PrismaService) {}
	entiti = this.prisma.permiso
	async create(createPermisoInput: PermisoCreateWithoutRolesAndPermisosInput) {
		return this.entiti.create({ data: { name: createPermisoInput.name } })
	}
	async createMany(createPermisoInput: CreateManyPermisosInput) {
		const permisos = await this.entiti.createMany({ data: createPermisoInput.data, skipDuplicates: true })
		return createPermisoInput.data.map(async (values) => {
			const findForName = await this.findOneName(values.name)
			return findForName
		})
	}

	async findAll() {
		return this.entiti.findMany()
	}
	async findOne(id: number) {
		return this.entiti.findUnique({ where: { id } })
	}
	async findOneName(name: string) {
		return this.entiti.findUnique({ where: { name }, include: { _count: true, RolesAndPermisos: true } })
	}
	async update(id: number, updatePermisoInput: UpdatePermisoInput) {
		return this.entiti.update({
			where: { id },
			data: { name: updatePermisoInput.name },
			include: { _count: true, RolesAndPermisos: true },
		})
	}

	remove(id: number) {
		return this.entiti.delete({ where: { id }, include: { RolesAndPermisos: true } })
	}
}
