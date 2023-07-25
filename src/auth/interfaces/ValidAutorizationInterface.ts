import { Permisions } from '../validatePermisionsAndRoles/Enum.validatePermions'
import { Roles } from '../validatePermisionsAndRoles/Enum.validateRol'

export interface ValidAutorizationInterface {
	permiso?: Permisions
	roles?: Roles[]
}
