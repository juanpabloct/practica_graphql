import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsePipes } from '@nestjs/common';
import { EncryptPasswordPipe } from 'src/common/encript-password/encrypt-password.pipe';
import { CreateUserInput } from 'src/auth/inputs/create-user.input';
import { Login, User } from 'src/user/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  // Mutations
  @UsePipes(EncryptPasswordPipe)
  @Mutation(() => User)
  async singUp(@Args('SingUp') createUserInput: CreateUserInput) {
    return await this.authService.SingUp(createUserInput);
  }
  @Mutation(() => Login)
  async singIn(@Args('singIn') createUserInput: CreateUserInput) {
    const session = await this.authService.SingIn(createUserInput);
    return session;
  }
}
