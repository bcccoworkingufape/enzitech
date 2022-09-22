import "reflect-metadata";

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { Env } from './shared/helpers/env.helper';

function setupSwaggerDocs(app: NestExpressApplication) {
  const docConfig = new DocumentBuilder()
    .setTitle('Enzitech API')
    .setDescription('API reference for Enzitech API')
    .setVersion(Env.getString('API_VERSION'))
    .addBearerAuth()
    .addServer(Env.getString('API_URL'))
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, docConfig);

  SwaggerModule.setup('/', app, swaggerDoc, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Enzitech Docs',
  });

  Logger.log('Mapped {/, GET} Swagger API route', 'RouterExplorer');
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger: true });

  if (Env.getString('NODE_ENV') === 'development') {
    setupSwaggerDocs(app);
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  await app.listen(Env.getNumber('PORT'));
}

bootstrap();
