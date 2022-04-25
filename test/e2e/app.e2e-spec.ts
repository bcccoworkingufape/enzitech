import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app/app.module';
import { ApiWrapper } from '../setups/api.setup';
import { AppService } from '../../src/app/app.service';
import { AppController } from '../../src/app/app.controller';
import { UserModule } from '../../src/infrastructure/ioc/user.module';
import { DatabaseModule } from '../../src/infrastructure/ioc/database.module';

describe('App E2E', () => {
  let app: INestApplication;
  let api: ApiWrapper;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        DatabaseModule,
        UserModule,
      ],
      providers: [AppService],
      controllers: [AppController],
    }).compile();

    app = moduleFixture.createNestApplication();
    api = new ApiWrapper(app);
    await app.init();
  }, 9999);

  describe('GET /health', () => {
    it('should be healthy', async () => {
      return api.buildRequest('get', '/health').expect(200).expect('Healthy');
    });
  });

  describe('GET /termsofuse', () => {
    it('should get the terms of use', async () => {
      return api
        .buildRequest('get', '/termsofuse')
        .expect(200)
        .expect(res => {
          expect(res.body).toBeTruthy();
        });
    });
  });
});
