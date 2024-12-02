import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { SwaggerHelper } from './common/helpers/swagger.helper';
import { AppConfig } from './configs/config.type';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Autoria-clone-nestjs')
    .setDescription('The cars API description')
    .setVersion('1.0')
    .addBearerAuth({
      in: 'header',
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerHelper.setDefaultResponses(document);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      defaultModelsExpandDepth: 5,
      persistAuthorization: true,
    },
  });
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>('app');
  await app.listen(appConfig.port, () => {
    console.log(
      `Server is running on http://${appConfig.host}:${appConfig.port}`,
    );
    console.log(
      `Swagger is running on http://${appConfig.host}:${appConfig.port}/docs`,
    );
  });
  console.log();
}
void bootstrap();
