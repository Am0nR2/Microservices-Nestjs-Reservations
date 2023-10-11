import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractSchema } from "@app/common";

@Schema({
    versionKey : false
})
export class User extends AbstractSchema{
    @Prop({unique : true})
    email : string 

    @Prop()
    password : string
}

export const UserSchema = SchemaFactory.createForClass(User)