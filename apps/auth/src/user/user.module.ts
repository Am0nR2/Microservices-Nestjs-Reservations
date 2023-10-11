import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@app/common';
import { User, UserSchema } from './schema/user-schema';
import { UserRepository } from './user-repository';
import { JwtStrategy, LocalStrategy } from '../strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports : [DatabaseModule, DatabaseModule.forFeature([{name : User.name, schema : UserSchema}])],
  controllers: [UserController],
  providers: [
    UserService, 
    UserRepository, 
    LocalStrategy,
    JwtStrategy
  ],
})
export class UserModule {}
