import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AuthDtoMock } from '../__mocks__/authentications/auth.dto.mock';
import { AppModule } from '../../src/app/app.module';
import { ApiWrapper } from '../setups/api.setup';
import { AuthModule } from '../../src/infrastructure/ioc/auth.module';
import { AuthSessionRepository } from '../../src/infrastructure/database/repositories/auth-session.repository';
import { UserRepository } from '../../src/infrastructure/database/repositories/user.repository';

describe('Auth E2E', () => {
  let app: INestApplication;
  let api: ApiWrapper;
  let authSessionRepository: AuthSessionRepository;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    api = new ApiWrapper(app);
    await app.init();
    authSessionRepository = moduleFixture.get(AuthSessionRepository);
    userRepository = moduleFixture.get(UserRepository);
  }, 9999);

  afterAll(async done => {
    // await authSessionRepository.query('TRUNCATE sessions CASCADE');
    // await userRepository.query('TRUNCATE users CASCADE');
    await app.close();
    done();
  });

  // describe('POST /auth/login', () => {
  //   it('should login as user', async () => {
  //     const { register } = await setupForLogin(api);

  //     const loginDto = AuthDtoMock.mockLoginDto({
  //       email: register.email,
  //       password: register.password,
  //     });

  //     return api
  //       .buildRequest('post', '/auth/login')
  //       .send(loginDto)
  //       .expect(201)
  //       .expect(res => {
  //         expect(res.body.accessToken).toBeTruthy();
  //       });
  //   });
  // });

});
