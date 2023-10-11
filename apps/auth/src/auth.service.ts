import { Injectable } from '@nestjs/common';
import { User } from './user/schema/user-schema';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs"
import { CurrentUserInterface } from '../../../libs/common/src';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService : JwtService,
    ){}

  async loginUser( user : User) : Promise<{access_token : string}>{
    const payload : CurrentUserInterface = {email : user.email, _id : user._id}

    const token = await this.jwtService.signAsync(payload)

    return { access_token: token }
  }
}
