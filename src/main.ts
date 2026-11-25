import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Valida automaticamente todos os DTOs (@Body) usando os decorators do class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos que não estão no DTO
      forbidNonWhitelisted: true, // e retorna 400 se vier campo desconhecido
      transform: true, // converte o JSON para a classe do DTO
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();