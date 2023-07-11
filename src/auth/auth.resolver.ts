import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsePipes } from '@nestjs/common';
import { EncryptPasswordPipe } from 'src/common/encript-password/encrypt-password.pipe';
import { CreateUserInput } from 'src/auth/inputs/create-user.input';
import { Login } from 'src/user/entities/user.entity';
import { RolAnduser } from 'src/@generated/prisma-nestjs-graphql/rol-anduser/rol-anduser.model';
import { SingInInput } from './inputs/sing-in.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(EncryptPasswordPipe)
  @Mutation(() => RolAnduser)
  async singUp(@Args('SingUp') createUserInput: CreateUserInput) {
    const newUser = await this.authService.SingUp(createUserInput);
    return newUser;
  }
  @Mutation(() => Login)
  async singIn(@Args('singIn') singIn: SingInInput) {
    const session = await this.authService.SingIn(singIn);
    return session;
  }
}
