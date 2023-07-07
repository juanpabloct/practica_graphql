import { Field, InputType } from '@nestjs/graphql';
import { RolesAndPermisosInput } from './rolesAndPermisos.input';

@InputType()
export class RolInput {
  @Field()
  id: number;
  @Field()
  name?: RolesAndPermisosInput;
}
