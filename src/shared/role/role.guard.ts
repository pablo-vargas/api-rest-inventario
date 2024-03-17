import { Injectable, CanActivate, ExecutionContext, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        let valid = requiredRoles.some((role) => user.roles?.includes(role));
        if(!valid) throw new HttpException({statusCode:HttpStatus.FORBIDDEN,message:['Permiso insuficiente: No cuenta con los privilegios necesarios para esta operación.']}, HttpStatus.FORBIDDEN);

        return valid
    }
}
export enum Role {
    ADMIN = 1,
    MANAGEMENT = 2,
    SUPERVISOR = 3,
    BOX = 4,
    INVENTORY = 5
}