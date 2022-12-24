import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from "../roles.decorator";
import { Request } from "express";
import { UserRole, UsersEntity } from "../users.entity";

@Injectable()
export class RolesGuard implements CanActivate {
 constructor(private reflector: Reflector) {}

 canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
   context.getHandler(),
   context.getClass(),
  ]);
  if (!requiredRoles) {
   return true;
  }
  const user = context.switchToHttp().getRequest<Request>().user as UsersEntity;
  return requiredRoles.some((role) => user.role?.includes(role));
 }
}
