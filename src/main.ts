import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidUnknownValues:true,
    forbidNonWhitelisted:true,
    transform:true
  }))
  app.setGlobalPrefix("api")
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
