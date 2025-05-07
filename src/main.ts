import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // allow requests from the frontend
  app.enableCors({
    origin: 'http://localhost:3000', //NOTE: change this later with the actual fronend url
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // allow cookies, might need them later
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
