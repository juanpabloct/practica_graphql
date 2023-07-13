import { InputType, PartialType } from '@nestjs/graphql'
import { PermisoCreateManyInput } from 'src/@generated/prisma-nestjs-graphql/permiso/permiso-create-many.input'

@InputType()
export class UpdatePermisoInput extends PartialType(PermisoCreateManyInput) {}
