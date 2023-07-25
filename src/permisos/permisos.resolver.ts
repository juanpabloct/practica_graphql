import { PermisoMinAggregate } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-min-aggregate.output'
import { CreateManyPermisosInput } from './dto/create-many-permisos'
import { UpdatePermisoInput } from './dto/update-permiso.input'
import { PermisoObject } from './entities/permiso.entity'
import { PermisosService } from './permisos.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { PermisoCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-create-without-roles-and-permisos.input'
import { Permiso } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso.model'

@Resolver(() => Permiso)
export class PermisosResolver {
	constructor(private readonly permisosService: PermisosService) { }

	@Query(() => [PermisoMinAggregate], { name: 'permisos' })
	findAll() {
		return this.permisosService.findAll()
	}

	@Query(() => PermisoMinAggregate, { name: 'permiso' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.permisosService.findOne(id)
	}

	@Mutation(() => PermisoMinAggregate)
	createPermiso(@Args('createPermisoInput') createPermisoInput: PermisoCreateWithoutRolesAndPermisosInput) {
		return this.permisosService.create(createPermisoInput)
	}
	@Mutation(() => [PermisoMinAggregate])
	async createPermisos(@Args('createPermisos') createPermisoInput: CreateManyPermisosInput) {
		const permisos = await this.permisosService.createMany(createPermisoInput)
		return permisos
	}

	@Mutation(() => PermisoMinAggregate)
	async updatePermiso(@Args('updatePermisoInput') updatePermisoInput: UpdatePermisoInput) {
		return this.permisosService.update(updatePermisoInput.id, updatePermisoInput)
	}

	@Mutation(() => PermisoMinAggregate)
	removePermiso(@Args('id', { type: () => Int }) id: number) {
		return this.permisosService.remove(id)
	}
}
