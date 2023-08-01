import { CreateRolAndPermisoInput } from './dto/create-rol-and-permiso.input'
import { UpdateRolAndPermisoInput } from './dto/update-rol-and-permiso.input'
import { RolAndPermisoObject } from './entities/rol-and-permiso.entity'
import { RolAndPermisosService } from './rol-and-permisos.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RolAndPermiso } from 'src/@generated/prisma-nestjs-graphql/rol-and-permiso/rol-and-permiso.model'

@Resolver(() => RolAndPermisoObject)
export class RolAndPermisosResolver {
	constructor(private readonly rolAndPermisosService: RolAndPermisosService) { }

	@Mutation(() => [RolAndPermiso])
	async createRolAndPermiso(
		@Args('CreateRolWithPermisos') createRolAndPermisoInput: CreateRolAndPermisoInput,
	) {
		const data = await this.rolAndPermisosService.create(createRolAndPermisoInput)
		return data
	}

	@Query(() => [RolAndPermiso], { name: 'rolAndPermisos' })
	async findAll() {
		return await this.rolAndPermisosService.findAll()
	}

	@Query(() => RolAndPermiso, { name: 'rolAndPermiso' })
	async findOne(@Args('id', { type: () => Int }) id: number) {
		return await this.rolAndPermisosService.findOne(id)
	}

	@Mutation(() => RolAndPermiso, { name: 'UpdateRolAndPermiso' })
	async updateRolAndPermiso(@Args('updateRolAndPermisoInput') updateRolAndPermisoInput: UpdateRolAndPermisoInput) {
		return await this.rolAndPermisosService.update(updateRolAndPermisoInput)
	}

	@Mutation(() => RolAndPermiso, { name: 'deleteRolAndPermiso' })
	async removeRolAndPermiso(@Args('id', { type: () => Int }) id: number) {
		return await this.rolAndPermisosService.remove(id)
	}
}
