import { ObjectType } from '@nestjs/graphql';
import { RolAndPermisoMinAggregate } from 'src/@generated/prisma-nestjs-graphql/rol-and-permiso/rol-and-permiso-min-aggregate.output';

@ObjectType()
export class RolAndPermisoObject extends RolAndPermisoMinAggregate {

}
