import { CreateManyPermisosInput } from './dto/create-many-permisos'
import { UpdatePermisoInput } from './dto/update-permiso.input'
import { BadRequestException, Injectable } from '@nestjs/common'
import { PermisoCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-create-without-roles-and-permisos.input'
import { PermisoMinAggregate } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-min-aggregate.output'
import { Permisions } from 'src/@generated/prisma-nestjs-graphql/prisma/permisions.enum'
import { PrismaService } from 'src/prisma-db/prisma-db.service'

@Injectable()
export class PermisosService {
	constructor(private readonly prisma: PrismaService) { }
	entiti = this.prisma.permiso
	async create({ name }: PermisoCreateWithoutRolesAndPermisosInput) {
		const existPermiso = await this.findOneName(name)
		if (!existPermiso) {

			return this.entiti.create({ data: { name } })
		} else {
			throw new BadRequestException(`Permiso ${name} already exist`)
		}
	}
	async createMany(createPermisoInput: CreateManyPermisosInput) {
		await this.entiti
			.createMany({
				data: createPermisoInput.data.map((data) => ({
					name: data,
				})),
				skipDuplicates: true,
			})
		const data: PermisoMinAggregate[] = []
		for (const permiso of createPermisoInput.data) {
			const findPermiso = await this.findOneName(permiso);
			data.push(findPermiso)
		}

		return data
	}

	async findAll() {
		return this.entiti.findMany()
	}
	async findOne(id: number) {
		return this.entiti.findUnique({ where: { id } })
	}
	async findOneName(name: keyof typeof Permisions) {
		return this.entiti.findUnique({ where: { name } })
	}
	async update(id: number, updatePermisoInput: UpdatePermisoInput) {
		return this.entiti.update({
			where: { id },
			data: { name: updatePermisoInput.name },
		})
	}

	remove(id: number) {
		return this.entiti.delete({ where: { id } })
	}
}
