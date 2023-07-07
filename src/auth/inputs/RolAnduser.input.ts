import { Field, InputType } from '@nestjs/graphql';
import { RolesAndPermisosInput } from './rolesAndPermisos.input';
import { CreateUserInput } from './create-user.input';

@InputType()
export class RolAnduserInput {
  @Field()
  id: number;
  @Field()
  rolName: RolesAndPermisosInput;
  @Field()
  user: CreateUserInput;
}
