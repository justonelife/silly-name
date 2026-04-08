import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '../apps/la-bidder-api/src/app/app.module';
import * as fs from 'fs';
import * as path from 'path';

async function generateSwagger() {
  console.log('Generating OpenAPI specification...');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  const config = new DocumentBuilder()
    .setTitle('LA Bidder API')
    .setDescription('The API documentation for the LA Bidder app')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        in: 'header',
      },
      'JWT-auth'
    )
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-Admin-Key',
        in: 'header',
        description: 'Admin access key',
      },
      'X-Admin-Key'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const docsDir = path.join(__dirname, '../docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  const outputPath = path.join(docsDir, 'swagger.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2), {
    encoding: 'utf8',
  });

  await app.close();
  console.log(`✅ Swagger JSON generated successfully at: ${outputPath}`);
}

generateSwagger().catch((err) => {
  console.error('❌ Failed to generate Swagger JSON', err);
  process.exit(1);
});
