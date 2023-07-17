import { JwtStratyegy } from '../strategies/interfaces/jwtStrategy'
import { Roles } from '../validateRoles/validateRoles'
import { ExecutionContext, UnauthorizedException, createParamDecorator } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const ValidAutorization = createParamDecorator((roles: string[], context: ExecutionContext) => {
	const ctx = GqlExecutionContext.create(context)
	const user = ctx.getContext().req.user as JwtStratyegy
	if (roles.includes(user.rol)) {
		return user
	} else {
		throw new UnauthorizedException(`User ${user.email} is Not Autorized`)
	}
})
