import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    transform : true,
    transformOptions : {
      enableImplicitConversion : true
    }
  }))
  await app.listen(3000);
}
bootstrap();
