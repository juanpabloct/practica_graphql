import { RolAnduserInput } from './RolAnduser.input';
import { RolInput } from './rol.input';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RolesAndPermisosInput {
	@Field()
	id: number;
	@Field()
	rol?: RolInput;
	@Field()
	rolAndUser: RolAnduserInput;
}
