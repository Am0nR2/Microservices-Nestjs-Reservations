import { Type } from "class-transformer";
import { IsDate, IsDefined, IsNotEmpty, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { isDate } from "util/types";
import { CreatePaymentsDto } from "@app/common";

export class CreateReservationDto {
    @IsDate()
    @Type(()=> Date)
    startDate: Date;
    
    @IsDate()
    @Type(()=> Date)
    endDate: Date;
  
    @IsString()
    @IsNotEmpty()
    placeId: string;
  
    @IsString()
    @IsNotEmpty()
    invoiceId: string;

    @IsNotEmptyObject()
    @IsDefined()
    @ValidateNested()
    @Type(()=> CreatePaymentsDto)
    charge : CreatePaymentsDto
}
