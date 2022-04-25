import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../src/aplication/use-cases/user.service';
import { UserRepository } from '../../src/infrastructure/database/repositories/user.repository';
import { UserProviderMock } from '../__mocks__/user/user.provider.mock';
import { UserNotFoundException } from '../../src/domain/exceptions/user.exception';

describe('UserThemeService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: UserProviderMock.mockUserRepository,
        },
       ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(getRepositoryToken(UserRepository));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('get', () => {
    it('should throw if user does not exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(userService.get(faker.datatype.uuid())).rejects.toThrow(
        new UserNotFoundException(),
      );
    });
  });
});
