import { CreateManyPermisosInput } from './dto/create-many-permisos'
import { UpdatePermisoInput } from './dto/update-permiso.input'
import { PermisoObject } from './entities/permiso.entity'
import { PermisosService } from './permisos.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PermisoCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-create-without-roles-and-permisos.input'
import { Permiso } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso.model'

@Resolver(() => PermisoObject)
export class PermisosResolver {
	constructor(private readonly permisosService: PermisosService) {}

	@Query(() => [Permiso], { name: 'permisos' })
	findAll() {
		return this.permisosService.findAll()
	}

	@Query(() => Permiso, { name: 'permiso' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.permisosService.findOne(id)
	}

	@Mutation(() => Permiso)
	createPermiso(@Args('createPermisoInput') createPermisoInput: PermisoCreateWithoutRolesAndPermisosInput) {
		return this.permisosService.create(createPermisoInput)
	}
	@Mutation(() => [Permiso])
	async createPermisos(@Args('createPermisos') createPermisoInput: CreateManyPermisosInput) {
		const permisos = await this.permisosService.createMany(createPermisoInput)
		return permisos
	}

	@Mutation(() => Permiso)
	async updatePermiso(@Args('updatePermisoInput') updatePermisoInput: UpdatePermisoInput) {
		return this.permisosService.update(updatePermisoInput.id, updatePermisoInput)
	}

	@Mutation(() => PermisoObject)
	removePermiso(@Args('id', { type: () => Int }) id: number) {
		return this.permisosService.remove(id)
	}
}
