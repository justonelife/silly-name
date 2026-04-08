import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  process.env.SEED_DATA = 'true';
  const app = await NestFactory.createApplicationContext(AppModule);
  console.log('--- SEEDING STARTED ---');
  // Seeding occurs automatically in SeedService (OnApplicationBootstrap)
  console.log('--- SEEDING FINISHED ---');
  await app.close();
  process.exit(0);
}

bootstrap();
