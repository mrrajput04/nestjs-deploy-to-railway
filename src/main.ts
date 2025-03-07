import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  /*

  enable these lines when you want to seed the database

  */

  // const seedService = app.get(SeedService)
  // await seedService.seed();

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Spotify-clone")
    .setDescription("Apis documentation for spotify app")
    .setVersion("1.0")
    .addBearerAuth({
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
      name: "JWT",
      description: "Enter jwt token",
      in: "header"
    },
      "JWT-auth")
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { persistAuthorization: true, }
  })

  const configService = new ConfigService()
  await app.listen(3011);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
