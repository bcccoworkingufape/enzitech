/* eslint-disable max-classes-per-file */
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super(['Email e/ou senha incorretos.']);
  }
}

export class InvalidPermissionException extends BadRequestException {
  constructor() {
    super(['Nivel de permissão inválida.']);
  }
}
export class InvalidPasswordException extends BadRequestException {
  constructor() {
    super(['As senhas não são iguais.']);
  }
}

export class InvalidSessionException extends UnauthorizedException {
  constructor() {
    super(['Sessão inválida ou expirada.']);
  }
}
