import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../../src/app/app.controller';
import { AppService } from '../../src/app/app.service';
import { UserService } from '../../src/aplication/use-cases/user.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [AppController],
      providers: [
        AppService,
        UserService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('Core App', () => {
    it('should be healthy', () => {
      expect(appController.healthCheck()).toBe('Healthy');
    });
  });
});
