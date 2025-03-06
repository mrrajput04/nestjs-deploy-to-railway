import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SeedService } from './seed/seed.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  /*

  enable these lines when you want to seed the database
  
  */

  // const seedService = app.get(SeedService)
  // await seedService.seed();
  await app.listen(3003);
}
bootstrap();
