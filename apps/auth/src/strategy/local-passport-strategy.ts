import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super(
        {usernameField : "email"}
    );
  }

  async validate(email: string, password: string): Promise<any> {
      try {
        return await this.userService.validateUser({email, password});
        
    } catch (error) {
        throw new UnauthorizedException(error)        
    }
  }
}