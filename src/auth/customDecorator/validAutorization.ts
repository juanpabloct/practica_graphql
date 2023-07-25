import { ExecutionContext, InternalServerErrorException, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidAutorizationInterface } from '../interfaces/ValidAutorizationInterface';

export const ValidAutorization = createParamDecorator(
	(data: unknown, context: ExecutionContext) => {
		const ctx = GqlExecutionContext.create(context);
		const user = ctx.getContext().req.user;
		const { permiso, roles } = data as ValidAutorizationInterface;

		if (roles && permiso) {
			let rolIsValid = false;
			let permisoIsValid = false;

			if (roles) {
				rolIsValid = roles.some((passRol) =>
					user.RolAnduser.some((rolUser) =>
						rolUser.rol.name.toLowerCase() === passRol.toLowerCase(),
					),
				);
			}

			if (permiso) {
				permisoIsValid = user.RolAnduser.some((rol) =>
					rol.rol.RolesAndPermisos.some((permisoUser) =>
						permisoUser.Permiso.name.toLowerCase() === permiso.toLowerCase(),
					),
				);
			}

			if (permisoIsValid || (rolIsValid && permisoIsValid)) {
				return true
			} else {
				throw new UnauthorizedException(`User ${user.email} is Not Authorized`);
			}
		} else {
			throw new InternalServerErrorException();
		}
	},
);
