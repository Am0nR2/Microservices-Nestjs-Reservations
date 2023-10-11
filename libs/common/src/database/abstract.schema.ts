import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaTypes, Types } from "mongoose";

@Schema()
export class AbstractSchema{
    @Prop(SchemaTypes.ObjectId)
    _id : Types.ObjectId

}