import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserRoleEnum } from '../../database/entities/enums/role.enum';
import { IUserData } from '../../modules/auth/models/interfaces/user-data.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoleEnum[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: IUserData = request.user;

    if (!requiredRoles.includes(user?.role)) {
      throw new ForbiddenException('You do not have permission (Roles)');
    }

    return true;
  }
}
