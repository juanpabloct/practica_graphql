import { RolMinAggregate } from 'src/@generated/prisma-nestjs-graphql/rol/rol-min-aggregate.output'
import { CreateRolInput } from './dto/create-rol.input'
import { UpdateRolInput } from './dto/update-rol.input'
import { RolService } from './rol.service'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { RolCreateWithoutRolesAndPermisosInput } from 'src/@generated/prisma-nestjs-graphql/rol/rol-create-without-roles-and-permisos.input'

@Resolver(() => RolMinAggregate)
export class RolResolver {
	constructor(private readonly rolService: RolService) { }

	@Mutation(() => RolMinAggregate)
	createRol(@Args('createRolInput') { name }: RolCreateWithoutRolesAndPermisosInput) {
		return this.rolService.create(name)
	}

	@Query(() => [RolMinAggregate], { name: 'roles' })
	findAll() {
		return this.rolService.findAll()
	}

	@Query(() => RolMinAggregate, { name: 'rol' })
	findOne(@Args('id', { type: () => Int }) id: number) {
		return this.rolService.findOne(id)
	}

	@Mutation(() => RolMinAggregate)
	updateRol(@Args('updateRolInput') updateRolInput: UpdateRolInput) {
		return this.rolService.update(updateRolInput.id, updateRolInput)
	}

	@Mutation(() => RolMinAggregate)
	removeRol(@Args('id', { type: () => Int }) id: number) {
		return this.rolService.remove(id)
	}
}
