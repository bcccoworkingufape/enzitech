import * as faker from 'faker';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app/app.module';
import { ApiWrapper } from '../setups/api.setup';
import { setupLoggedUser } from '../setups/auth.setup';
import { UserDto } from '../../src/presentation/dtos/user/user.dto';
import { UserDtoMock } from '../__mocks__/user/user.dto.mock';
import { UserModule } from '../../src/infrastructure/ioc/user.module';
import { DatabaseModule } from '../../src/infrastructure/ioc/database.module';
import { AuthSessionRepository } from '../../src/infrastructure/database/repositories/auth-session.repository';
import { UserRepository } from '../../src/infrastructure/database/repositories/user.repository';
import { ListUserDto } from '../../src/presentation/dtos/user/list-user.dto';
import { setupUser } from '../setups/user.setup';

describe('User E2E', () => {
  let app: INestApplication;
  let api: ApiWrapper;
  let loggedUser: { user: UserDto; accessToken: string };
  let authSessionRepository: AuthSessionRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule, DatabaseModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    api = new ApiWrapper(app);
    await app.init();

    loggedUser = await setupLoggedUser(api);
    authSessionRepository = moduleFixture.get(AuthSessionRepository);
    userRepository = moduleFixture.get(UserRepository);
  });

  afterAll(async done => {
    await app.close();
    done();
  });


  describe('POST /users', () => {
    it('should register user data', async () => {
      const createUserDto = UserDtoMock.mockCreateUserDto();
      return api
        .buildRequest('post', '/users', loggedUser.accessToken)
        .send(createUserDto)
        .expect(201);
    });
  });

  describe('GET /users', () => {
    it('should list users', async () => {
      await setupUser(api);
      await setupUser(api);

      return api
        .buildRequest('get', '/users', loggedUser.accessToken)
        .expect(200)
        .expect(res => {
          const users = new ListUserDto(res.body);
          expect(users.count).toBeGreaterThanOrEqual(2);
        });
    });
  });

  describe('PUT /users', () => {
    it('should update user by id', async () => {
      const { user } = await setupUser(api);

      const updateUserDto = UserDtoMock.mockUpdateUserDto();

      return api
        .buildRequest('put', `/users/${user.id}`, loggedUser.accessToken)
        .send(updateUserDto)
        .expect(200);
    });
  });

  describe('DELETE /users', () => {
    it('should delete user by id', async () => {
      const { user } = await setupUser(api);

      await api.buildRequest('delete', `/users/${user.id}`, loggedUser.accessToken).expect(200);

      return api.buildRequest('get', `/users/${user.id}`, loggedUser.accessToken).expect(404);
    });
  });
});
