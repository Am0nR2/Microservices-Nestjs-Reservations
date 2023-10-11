import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user-repository';
import * as bcrypt from "bcryptjs" 
import { CurrentUserInterface } from '@app/common';

@Injectable()
export class UserService {
    constructor(private readonly usersRepository : UserRepository){}

    async registerUser(body : CreateUserDto){
        
        return await this.usersRepository.createOne({
            ...body,
            password : await bcrypt.hash(body.password, 10)
        })
    
    }

    async validateUser(body : CreateUserDto){
        const user = await this.usersRepository.findOne({email : body.email})

        const isPwMatches = await bcrypt.compare(body.password, user.password)

        if(!isPwMatches) throw new ForbiddenException("Password is incorrect...")

        return user

    }

    async getMe(body : CurrentUserInterface){
        return await this.usersRepository.findOne({_id: body._id})
    }

}
