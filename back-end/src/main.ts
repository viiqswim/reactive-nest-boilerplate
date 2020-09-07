import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import * as morgan from 'morgan';
import * as compression from 'compression';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Sample API documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('example')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(compression());
  app.use(morgan('combined'));

  await app.listen(3001);
}
bootstrap();
