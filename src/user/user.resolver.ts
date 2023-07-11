import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserWithoutPassword, UserObject } from './entities/user.entity';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UseGuards, UsePipes } from '@nestjs/common';
import { EncryptPasswordPipe } from 'src/common/encript-password/encrypt-password.pipe';
import { JwtAuthGuard } from 'src/auth/guards/jwtGuard';
import { User } from 'src/@generated/prisma-nestjs-graphql/user/user.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  //@UseGuards(JwtAuthGuard)
  @Query(() => [User], { name: 'users' })
  async findAll() {
    const users =await this.userService.findAll();
    return users
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
