import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../../aplication/use-cases/user.service';
import { ROLES_KEY } from '../../../shared/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    try {
      const { user } = context.switchToHttp().getRequest();
      const { role: userRole } = await this.userService.get(user.id);
      return requiredRoles.some(role => role === userRole);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
