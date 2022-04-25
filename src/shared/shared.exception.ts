/* eslint-disable max-classes-per-file */
import { UnauthorizedException } from '@nestjs/common';

export class RoleNotAllowedException extends UnauthorizedException {
  constructor() {
    super('Usuário não possui a permissão necessária.');
  }
}
