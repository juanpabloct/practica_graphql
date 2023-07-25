import { Rol } from "./tokenDesencrypt";


export  interface JwtStratyegy {
  id: number;
  email: string;
  active: boolean;
  RolAnduser: {
    id: number;
    userId: number;
    rolId: number;
    rol: Rol;
    User: JwtStratyegy;
  }[];
  _count: {
    RolAnduser: number;
  };
  iat: number;
  exp: number;
}