import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

export class ApiWrapper {
  private app: INestApplication;

  constructor(newApp: INestApplication) {
    this.app = newApp;
  }

  buildRequest(
    method: 'post' | 'get' | 'put' | 'patch' | 'delete',
    route: string,
    token?: string,
  ): request.Test {
    let api = request(this.app.getHttpServer())[method](route).set('Accept', 'application/json');

    if (token) {
      api = api.set('Authorization', `Bearer ${token}`);
    }

    return api;
  }

  getApp(): INestApplication {
    return this.app;
  }
}
