import { AccessTokenDto } from '../../src/presentation/dtos/auth-dto/access-token.dto';
import { RegisterDto } from '../../src/presentation/dtos/auth-dto/register.dto';
import { AuthDtoMock } from '../__mocks__/authentications/auth.dto.mock';
import { UserDto } from '../../src/presentation/dtos/user/user.dto';
import { ApiWrapper } from './api.setup';

export const setupForRegisterName = async (
  api: ApiWrapper,
): Promise<{ register: RegisterDto; accessToken: AccessTokenDto }> => {
  const registerDto = AuthDtoMock.mockRegisterDto({});
  const res = await api.buildRequest('post', '/auth/register').send(registerDto).expect(201);

  return {
    register: registerDto,
    accessToken: new AccessTokenDto(res.body),
  };
};

export const setupLoggedUser = async (
  api: ApiWrapper,
): Promise<{
  user: UserDto;
  accessToken: string;
}> => {
  const { user, register } = await setupForLogin(api);

  const loginDto = AuthDtoMock.mockLoginDto({
    email: register.email,
    password: register.password,
  });

  const response = await api
    .buildRequest('post', '/auth/login')
    .send(loginDto)
    .expect(201)
    .expect(res => {
      expect(res.body.accessToken).toBeTruthy();
    });

  return {
    user,
    accessToken: response.body.accessToken,
  };
};
