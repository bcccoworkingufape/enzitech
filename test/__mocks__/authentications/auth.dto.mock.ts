import * as faker from 'faker';
import { AccessTokenDto } from '../../../src/presentation/dtos/auth-dto/access-token.dto';
import { LoginDto } from '../../../src/presentation/dtos/auth-dto/login.dto';
import { RegisterDto } from '../../../src/presentation/dtos/auth-dto/register.dto';

export class AuthDtoMock {
  static mockRegisterDto(partial?: Partial<RegisterDto>): RegisterDto {
    return new RegisterDto({
      name: partial?.name ?? faker.name.firstName(),
      email: partial?.email ?? faker.internet.email(),
      password: partial?.password ?? faker.internet.password(12),
    });
  }

  static mockLoginDto(partial?: Partial<LoginDto>): LoginDto {
    return new LoginDto({
      email: partial?.email ?? faker.internet.email(),
      password: partial?.password ?? faker.internet.password(12),
    });
  }

  static mockAccessTokenDto(partial?: Partial<AccessTokenDto>): AccessTokenDto {
    return new AccessTokenDto({
      accessToken: partial?.accessToken ?? faker.datatype.uuid(),
    });
  }
}
