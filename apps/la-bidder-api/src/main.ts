import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({ origin: '*' });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}/api`);
  Logger.log(`WebSocket gateway on: ws://localhost:${port}/bidding`);
}

bootstrap();
