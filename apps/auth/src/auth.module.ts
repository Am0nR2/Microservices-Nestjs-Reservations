import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule, ErrorInterceptor } from '@app/common';
import { ConfigModule } from './config/config.module';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule, 
    ConfigModule, 
    UserModule,
    JwtModule.registerAsync({
      useFactory : (configService : ConfigService) => ({
        secret : configService.getOrThrow("JWT_SECRET"),
        signOptions : {
          expiresIn : configService.getOrThrow("JWT_EXPIRE")
        }, 
      }),
        inject : [ConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,
  {
    provide : APP_INTERCEPTOR,
    useClass : ErrorInterceptor
  }],
})
export class AuthModule {}
