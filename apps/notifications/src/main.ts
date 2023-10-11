import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService)
  await app.connectMicroservice({
    transport : Transport.TCP,
    options : {
      host : "0.0.0.0",
      port : configService.get("PORT")
    }
  })
  console.log("hello")
  await app.startAllMicroservices()
}
bootstrap();
