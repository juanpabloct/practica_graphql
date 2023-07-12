import { CreateUserInput } from './create-user.input';
import { InputType, OmitType } from '@nestjs/graphql';

@InputType()
export class SingInInput extends OmitType(CreateUserInput, ['Rol', 'active']) {}
