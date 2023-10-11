import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService)
  app.connectMicroservice({
    transport : Transport.TCP,
    options : {
      host : "0.0.0.0",
      port : configService.get("TCP_PORT")
    }
  })
  app.useGlobalPipes(new ValidationPipe({whitelist : true, transform : true}))
  app.startAllMicroservices()
  await app.listen(configService.get("HTTP_PORT"));
}
bootstrap();
