import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthJwtGuard } from '../guards';
import { CurrentUserInterface } from '@app/common';
import { currentUser } from '@app/common';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post()
    async registerUser(
        @Body() body : CreateUserDto
    ){
        return await this.userService.registerUser(body)
    }

    @UseGuards(AuthJwtGuard)
    @Get("me")
    async getUser(
      @currentUser() user : CurrentUserInterface
    ){
      return await this.userService.getMe(user)
    }
}
