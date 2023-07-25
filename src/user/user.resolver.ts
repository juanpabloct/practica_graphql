import { UpdateUserInput } from './dto/inputs/update-user.input'
import { UserObject, UserWithoutPassword } from './entities/user.entity'
import { UserService } from './user.service'
import { UseGuards, UsePipes } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum'
import { UserMinAggregate } from 'src/@generated/prisma-nestjs-graphql/user/user-min-aggregate.output'
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model'
import { RolesMeta } from 'src/auth/decorators/roles.decorator'
import { RolesGuard } from 'src/auth/guards/roles.guard'
import { EncryptPasswordPipe } from 'src/common/encript-password/encrypt-password.pipe'
@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) { }
	//@ValidAutorization({ permiso: Permisions.READ_ALL, roles: [Roles.USER] })
	//@UseGuards(JwtAuthGuard)
	@RolesMeta([Roles.USER])
	@UseGuards(RolesGuard)
	@Query(() => [UserWithoutPassword], { name: 'users' })
	async findAll(
	) {
		const users = await this.userService.findAll()
		return users
	}

	@Query(() => UserMinAggregate, { name: 'user' })
	async findOne(@Args('id', { type: () => Int }) id: number) {
		return await this.userService.findOne(id)
	}

	@UsePipes(EncryptPasswordPipe)
	@Mutation(() => User)
	async updateUser(@Args('updateUser') update: UpdateUserInput) {
		return await this.userService.update(update)
	}

	@Mutation(() => UserObject)
	async removeUser(@Args('id', { type: () => Int }) id: number) {
		return await this.userService.remove(id)
	}
}
