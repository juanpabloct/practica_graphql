import { Roles } from '@prisma/client'
import { CreateRolAndPermisoInput, CreateRolAndOnePermisoInput } from './dto/create-rol-and-permiso.input'
import { UpdateRolAndPermisoInput } from './dto/update-rol-and-permiso.input'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma-db/prisma-db.service'
import { PermisosService } from 'src/permisos/permisos.service'
import { RolService } from 'src/rol/rol.service'

@Injectable()
export class RolAndPermisosService {
	constructor(private readonly db: PrismaService, private permisoService: PermisosService, private rolService: RolService) { }
	entiti = this.db.rolAndPermiso
	async createOne({ rol, permiso }: CreateRolAndOnePermisoInput) {
		return await this.entiti.create({
			data: {
				Permiso:
				{
					connectOrCreate:
					{
						create: { name: permiso },
						where: { name: permiso }
					}
				},
				Rol: {
					connectOrCreate: {
						create: {
							name: rol
						},
						where: {
							name: rol
						}
					}
				}
			}
		})

	}
	async create({ rol, permisos }: CreateRolAndPermisoInput) {
		await this.permisoService.createMany({ data: permisos })
		const findPermisos = await this.permisoService.createMany({ data: permisos })
		const findRol = await this.rolService.findOneWithName(rol)
		return await this.entiti.createMany({ data: findPermisos.map((permiso) => ({ permisoId: permiso.id, rolId: findRol.id })) })
	}

	async findAll() {
		return this.entiti.findMany()
	}

	// Asumiendo que 'RolAndPermisoWhereUniqueInput' tiene una propiedad 'name'.
	async findManyWithNameRol(rol: keyof typeof Roles) {
		return await this.entiti.findMany({
			where: {
				Rol: {
					name: rol
				}
			},
		});
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
