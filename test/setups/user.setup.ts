import { getRepositoryToken } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { ApiWrapper } from './api.setup';
import { UserDto } from '../../src/presentation/dtos/user/user.dto';
import { UserRepository } from '../../src/infrastructure/database/repositories/user.repository';
import { User } from '../../src/domain/models/user.entity';
import { UserDtoMock } from '../__mocks__/user/user.dto.mock';
import { Env } from '../../src/shared/helpers/env.helper';

export const setupUser = async (api: ApiWrapper): Promise<{ user: UserDto }> => {
  const userRepository = api.getApp().get<UserRepository>(getRepositoryToken(User));

  const userMock = UserDtoMock.mockCreateUserDto();
  const user = userRepository.create({
    name: userMock.name,
    passwordHash: await hash(userMock.password, Env.getNumber('SALT_ROUNDS')),
    email: userMock.email.toLowerCase(),
  });

  const savedUser = await userRepository.save(user);

  return {
    user: savedUser,
  };
};
