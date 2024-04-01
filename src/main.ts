import { config as startDotenv } from 'dotenv';

startDotenv();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const { port } = getConfig();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AllowMe Blog API')
    .setDescription('API for AllowMe-Blog test')
    .setVersion('1.0')
    .addTag('Users')
    .addTag('Posts')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}
bootstrap();
