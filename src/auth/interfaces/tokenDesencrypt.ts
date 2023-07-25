export interface Permiso {
  id: number;
  name: string;
  Rol: Rol;
}

export interface RolesAndPermisos {
  id: number;
  rolId: number;
  permisoId: number;
  Permiso: Permiso;
}

export interface Rol {
  id: number;
  name: string;
  RolesAndPermisos: RolesAndPermisos[];
}

