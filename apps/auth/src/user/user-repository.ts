import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "./schema/user-schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends AbstractRepository<User>{
    protected readonly logger = new Logger(UserRepository.name)
    constructor (
        @InjectModel(User.name)
        private readonly userRepository : Model<User>
    ){
        super(
            userRepository
        )
    }
}