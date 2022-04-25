import { InternalServerErrorException } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { hash } from 'bcrypt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env } from '../../src/shared/helpers/env.helper';
import { UserRole } from '../../src/presentation/dtos/user/enums/user-role.enum';
import { EmailAlreadyRegisteredException } from '../../src/domain/exceptions/user.exception';
import { UserService } from '../../src/aplication/use-cases/user.service';
import { UserDtoMock } from '../__mocks__/user/user.dto.mock';
import { UserProviderMock } from '../__mocks__/user/user.provider.mock';
import { AuthSessionRepository } from '../../src/infrastructure/database/repositories/auth-session.repository';
import { InvalidCredentialsException } from '../../src/domain/exceptions/auth.exception';
import { AuthService } from '../../src/aplication/use-cases/auth.service';
import { AuthDtoMock } from '../__mocks__/authentications/auth.dto.mock';
import { AuthProviderMock } from '../__mocks__/authentications/auth.provider.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: Env.getString('JWT_SECRET_KEY'),
          signOptions: { expiresIn: Env.getString('JWT_EXPIRATION_TIME') },
        }),
      ],
      providers: [
        AuthService,
        {
          provide: UserService,
          useFactory: UserProviderMock.mockUserService,
        },
        {
          provide: AuthSessionRepository,
          useFactory: AuthProviderMock.mockAuthSessionRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });


  describe('login', () => {
    it('should not login with wrong password', async () => {
      const loginDto = AuthDtoMock.mockLoginDto();
      const user = UserDtoMock.mockUserEntity({
        email: loginDto.email,
        passwordHash: await hash(`${loginDto.password}wrong`, Env.getNumber('SALT_ROUNDS')),
      });
      jest.spyOn(userService, 'findBy').mockResolvedValueOnce(user);
      await expect(authService.login(loginDto.email, loginDto.password)).rejects.toThrow(
        new InvalidCredentialsException(),
      );
    });

    it('should not login with invalid email', async () => {
      const loginDto = AuthDtoMock.mockLoginDto();

      jest.spyOn(userService, 'findBy').mockImplementationOnce(() => {
        throw new InvalidCredentialsException();
      });

      await expect(authService.login(loginDto.email, loginDto.password)).rejects.toThrow(
        new InvalidCredentialsException(),
      );
    });
  });
});
