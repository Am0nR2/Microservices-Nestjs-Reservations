import { IsDefined, IsNotEmptyObject, IsNumber, ValidateNested } from "class-validator";
import { Card } from "./card.dto";
import { Type } from "class-transformer";

export class CreatePaymentsDto{
    @IsNotEmptyObject()
    @IsDefined()
    @ValidateNested()
    @Type(()=> Card)
    card : Card
    
    @IsNumber()
    amount : number   
}