import { Field, InputType } from '@nestjs/graphql';
import { RolAnduserInput } from './RolAnduser.input';
import { RolInput } from './rol.input';

@InputType()
export class RolesAndPermisosInput {
  @Field()
  id: number;
  @Field()
  rol?: RolInput;
  @Field()
  rolAndUser: RolAnduserInput;
}
