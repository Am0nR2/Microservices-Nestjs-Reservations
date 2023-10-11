import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CurrentUserInterface, currentUser } from '@app/common';
import { AuthJwtGuard, AuthLocalGuard } from './guards';
import { User } from './user/schema/user-schema';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
// import { CurrentUserInterface } from '@app/common';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(AuthLocalGuard)
  @Post("login")
  async loginUser(
    @currentUser() user : User,
  ){
    return await this.authService.loginUser(user)
  }

  @UseGuards(AuthJwtGuard)
  @MessagePattern("authenticate")
  async authenticateUser(
    @currentUser() user : CurrentUserInterface
  ){
    return user
  }

}
