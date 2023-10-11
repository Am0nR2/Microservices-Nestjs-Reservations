import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ConfigModule } from './config/config.module';
import { AUTH_SERVICE, DatabaseModule, ErrorInterceptor, NOTIFICATION_SERVICE, PAYMENT_SERVICE } from '@app/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ReservationRepository } from './reservation-repository';
import { Reservation, ReservationSchema } from './schemas/reservation.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, 
    DatabaseModule, 
    DatabaseModule.forFeature([{name : Reservation.name, schema : ReservationSchema}]),
    ClientsModule.registerAsync([
      {
        name : AUTH_SERVICE,
        useFactory : (configService : ConfigService) => {
          return {
            transport : Transport.TCP,
            options : {
              host : configService.getOrThrow("AUTH_HOST"),
              port : configService.getOrThrow("AUTH_PORT")
            }
          }
        },
        inject : [ConfigService]
      },
      {
        name : PAYMENT_SERVICE,
        useFactory : (configService : ConfigService) => {
          return {
            transport : Transport.TCP,
            options : {
              host : configService.getOrThrow("PAYMENT_HOST"),
              port : configService.getOrThrow("PAYMENT_PORT")
            }
          }
        },
        inject : [ConfigService]
      },
      {
        name : NOTIFICATION_SERVICE,
        useFactory : (configService : ConfigService) => {
          return {
            transport : Transport.TCP,
            options :{
              host : configService.getOrThrow("NOTIFICATION_HOST"),
              port : configService.getOrThrow("NOTIFICATION_PORT")
            }
          }
        },
        inject : [ConfigService]
      }
    ])
  ],
  controllers: [ReservationController],
  providers: [ReservationService
    ,{
      provide : APP_INTERCEPTOR,
      useClass : ErrorInterceptor
  },
  ReservationRepository],
})
export class ReservationModule {}
