import {  InputType,  OmitType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class SingInInput extends OmitType(CreateUserInput,["Rol", "active", ]) {
}
