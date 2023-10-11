import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { AbstractSchema } from "@app/common";
import { Types } from "mongoose";

@Schema({
    versionKey : false,
    timestamps : true
})
export class Reservation extends AbstractSchema{
    @Prop()
    startDate: Date;
  
    @Prop()
    endDate: Date;
  
    @Prop()
    userId: Types.ObjectId
  
    @Prop()
    placeId: string;
    
    @Prop()
    invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation)