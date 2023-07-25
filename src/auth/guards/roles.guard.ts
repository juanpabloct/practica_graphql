import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "@nestjs/passport";
import { JwtStratyegy } from "../interfaces/jwtStrategy";

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector, private jwt: JwtService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const graphqlContext = GqlExecutionContext.create(context);
        const request = graphqlContext.getContext().req;

        // Accede al token encriptado desde la cabecera de autorización
        const token = request.headers.authorization?.split(' ')[1];
        const { RolAnduser } = this.jwt.decode(token) as JwtStratyegy
        const rolIsValid = roles.some((passRol) =>
            RolAnduser.some((rolUser) =>
                rolUser.rol.name.toLowerCase() === passRol.toLowerCase(),
            ),
        );
        // if (rolIsValid) { return rolIsValid }
        // else {
        //     throw new UnauthorizedException("user not permitions for acces to resolver")
        // }
        return rolIsValid
    }
}