import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UserObject, UserWithoutPassword } from './entities/user.entity';
import { UserService } from './user.service';
import { UseGuards, UsePipes } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';
import { JwtAuthGuard } from 'src/auth/guards/jwtGuard';
import { EncryptPasswordPipe } from 'src/common/encript-password/encrypt-password.pipe';
@Resolver(() => User)
export class UserResolver {
	constructor(private readonly userService: UserService) {}
	@UseGuards(JwtAuthGuard)
	@Query(() => [UserWithoutPassword], { name: 'users' })
	async findAll() {
		const users = await this.userService.findAll();
		return users;
	}

	@Query(() => User, { name: 'user' })
	async findOne(@Args('id', { type: () => Int }) id: number) {
		return await this.userService.findOne(id);
	}

	@UsePipes(EncryptPasswordPipe)
	@Mutation(() => User)
	async updateUser(@Args('updateUser') update: UpdateUserInput) {
		return await this.userService.update(update);
	}

	@Mutation(() => UserObject)
	async removeUser(@Args('id', { type: () => Int }) id: number) {
		return await this.userService.remove(id);
	}
}
