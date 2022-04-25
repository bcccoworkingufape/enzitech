export class AuthProviderMock {
  static mockAuthService(): any {
    return {
      login: jest.fn(),
      register: jest.fn(),
    };
  }

  static mockAuthSessionRepository(): any {
    return {
      create: jest.fn(),
      save: jest.fn(),
    };
  }
}
