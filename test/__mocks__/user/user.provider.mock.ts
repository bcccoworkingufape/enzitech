export class UserProviderMock {
  static mockUserService(): any {
    return {
      create: jest.fn(),
      delete: jest.fn(),
      findByEmail: jest.fn(),
      get: jest.fn(),
      list: jest.fn(),
      update: jest.fn(),
      findBy: jest.fn(),
    };
  }

  static mockUserRepository(): any {
    return {
      save: jest.fn(),
      delete: jest.fn(),
      findOne: jest.fn(),
      list: jest.fn(),
    };
  }
}
