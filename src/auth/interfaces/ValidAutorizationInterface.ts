import { Permisions } from '../validatePermisionsAndRoles/Enum.validatePermitions'
import { Roles } from '../validatePermisionsAndRoles/Enum.validateRol'

export interface ValidAutorizationInterface {
	permiso?: Permisions
	roles?: Roles[]
}
