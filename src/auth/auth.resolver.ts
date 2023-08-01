import { AuthService } from './auth.service'
import { SingInInput } from './inputs/sing-in.input'
import { SingOffInput } from './inputs/singOff.input'
import { SingOffObject } from './interfaces/singOffObject'
import { UsePipes } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { CreateUserInput } from 'src/auth/inputs/create-user.input'
import { EncryptPasswordPipe } from 'src/common/encript-password/encrypt-password.pipe'
import { Login } from 'src/user/entities/user.entity'

@Resolver()
export class AuthResolver {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(EncryptPasswordPipe)
	@Mutation(() => SingOffObject)
	async singUp(@Args('SingUp') createUserInput: CreateUserInput) {
		const newUser = await this.authService.SingUp(createUserInput)
		return newUser
	}
	@Mutation(() => Login)
	async singIn(@Args('singIn') singIn: SingInInput) {
		const session = await this.authService.SingIn(singIn)
		return session
	}
	@Mutation(() => SingOffObject)
	async singOff(@Args('singOff') { id }: SingOffInput) {
		const session = await this.authService.signOff(id)
		return session
	}
}
