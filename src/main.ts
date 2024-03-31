import { config as startDotenv } from 'dotenv';

startDotenv();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getConfig } from './config';

async function bootstrap() {
  const { port } = getConfig();
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
