/* eslint-disable max-classes-per-file */
import { NotFoundException, BadRequestException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor() {
    super(['Usuário não encontrado.']);
  }
}


export class EmailAlreadyRegisteredException extends BadRequestException {
  constructor() {
    super(['Email já registrado.']);
  }
}
