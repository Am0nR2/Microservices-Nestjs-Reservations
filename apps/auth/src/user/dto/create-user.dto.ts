import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDto{
    @IsEmail()
    email : string 

    @IsString()
    @IsNotEmpty()
    password : string 
}