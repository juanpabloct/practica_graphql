import { CreateRolInput } from './dto/create-rol.input'
import { UpdateRolInput } from './dto/update-rol.input'
import { RolObject } from './entities/rol.entity'
import { RolService } from './rol.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RolCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/rol/rol-create-without-roles-and-permisos.input'

@Resolver(() => RolObject)
export class RolResolver {
	constructor(private readonly rolService: RolService) {}

	@Mutation(() => RolObject)
	createRol(@Args('createRolInput') { name }: RolCreateWithoutRolesAndPermisosInput) {
		return this.rolService.create(name)
	}

	@Query(() => [RolObject], { name: 'rol' })
	findAll() {
		return this.rolService.findAll()
	}

	@Query(() => RolObject, { name: 'rol' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.rolService.findOne(id)
	}

	@Mutation(() => RolObject)
	updateRol(@Args('updateRolInput') updateRolInput: UpdateRolInput) {
		return this.rolService.update(updateRolInput.id, updateRolInput)
	}

	@Mutation(() => RolObject)
	removeRol(@Args('id', { type: () => Int }) id: number) {
		return this.rolService.remove(id)
	}
}
