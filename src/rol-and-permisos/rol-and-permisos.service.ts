import { CreateRolAndPermisoInput, CreateRolAndPermisoOneInput } from './dto/create-rol-and-permiso.input'
import { UpdateRolAndPermisoInput } from './dto/update-rol-and-permiso.input'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class RolAndPermisosService {
	constructor(private readonly db: PrismaService) {}
	entiti = this.db.rolAndPermiso
	async createOne({ rol, permiso }: CreateRolAndPermisoOneInput) {
		const findPermisoRol = await this.entiti.findFirst({
			where: { Permiso: { name: permiso }, Rol: { name: rol } },
			include: { Permiso: true, Rol: true },
		})
		if (!findPermisoRol) {
			const data = await this.entiti.create({
				data: { Permiso: { connect: { name: permiso } }, Rol: { connect: { name: rol } } },
				include: { Permiso: true, Rol: true },
			})
			return data
		} else {
			return findPermisoRol
		}
	}
	async create({ rol, permisos }: CreateRolAndPermisoInput) {
		const data = await Promise.all(await permisos.map(async (permiso) => await this.createOne({ permiso, rol })))
		return data
	}

	async findAll() {
		return this.entiti.findMany()
	}

	async findOne(id: number) {
		return this.entiti.findUnique({ where: { id } })
	}

	async update({ id, rol, permiso }: UpdateRolAndPermisoInput) {
		const rolId = (await this.db.rol.findUnique({ where: { name: rol }, select: { id: true } })).id
		const permisoId = (await this.db.permiso.findUnique({ where: { name: permiso }, select: { id: true } })).id
		if (rolId && permisoId) {
			return this.entiti.update({ where: { id }, data: { rolId, permisoId } })
		} else {
			throw new NotFoundException('Not Fount permnisse or Rol')
		}
	}

	async remove(id: number) {
		return this.entiti.delete({ where: { id }, include: { Permiso: true, Rol: true } })
	}
}
