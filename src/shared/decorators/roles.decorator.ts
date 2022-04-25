import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]): any => SetMetadata(ROLES_KEY, roles);
