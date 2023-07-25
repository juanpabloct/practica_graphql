import { Permisions } from 'src/@generated/prisma-nestjs-graphql/prisma/permisions.enum'
import { Roles } from 'src/@generated/prisma-nestjs-graphql/prisma/roles.enum'

export interface ValidAutorizationInterface {
	permiso?: Permisions
	roles?: Roles[]
}
