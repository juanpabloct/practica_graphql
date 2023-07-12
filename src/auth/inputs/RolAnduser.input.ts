import { CreateUserInput } from './create-user.input';
import { RolesAndPermisosInput } from './rolesAndPermisos.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RolAnduserInput {
	@Field()
	id: number;
	@Field()
	rolName: RolesAndPermisosInput;
	@Field()
	user: CreateUserInput;
}
