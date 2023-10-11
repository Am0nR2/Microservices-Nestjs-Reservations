import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CurrentUserInterface } from '@app/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService : ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request : any) => {
          return request?.headers?.Authorization.split("Bearer ")[1] || request?.Authorization || request?.headers.authorization  
        }
        
       ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow("JWT_SECRET")
    });
  }

  async validate(payload: CurrentUserInterface) {
    return { _id: payload._id, email: payload.email };
  }
}