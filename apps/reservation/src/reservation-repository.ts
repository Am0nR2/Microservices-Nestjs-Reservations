import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Reservation } from "./schemas/reservation.schema";
import { Model } from "mongoose";
import { AbstractRepository } from "@app/common";

@Injectable()
export class ReservationRepository extends AbstractRepository<Reservation>{
    protected readonly logger = new Logger(ReservationRepository.name);

    constructor (
        @InjectModel(Reservation.name)
        private readonly reservationModel : Model<Reservation>
    ){
        super(reservationModel)
    }
}