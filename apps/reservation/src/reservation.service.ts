import { Inject, Injectable } from '@nestjs/common';
import { ReservationRepository } from './reservation-repository';
import { CreateReservationDto, UpdateReservationDto } from './dto';
import { CurrentUserInterface, NOTIFICATION_SERVICE, PAYMENT_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { response } from 'express';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReservationService {
  constructor(
    @Inject(PAYMENT_SERVICE) 
    private readonly paymentsService : ClientProxy,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService : ClientProxy,
    private readonly reservationsResository : ReservationRepository
  ){}
  async create(user: CurrentUserInterface ,createReservationDto: CreateReservationDto) {
    const payment = await lastValueFrom(this.paymentsService.send("charge_payment", createReservationDto.charge.amount))

    
    const reservation =  await this.reservationsResository.createOne({
      ...createReservationDto,
      invoiceId : payment.id,
      userId : user._id
    })
    
    await this.notificationsService.emit("send_email", {email : user.email, reservation})
    return reservation
 
  }

  async findAll() {
    return await this.reservationsResository.findAll({})
  }

  async findOne(_id: string) {
    return await this.reservationsResository.findOne({_id})
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationsResository.findOneAndUpdate({_id}, updateReservationDto)
  }

  async remove(_id: string) {
    return await this.reservationsResository.findOneAndDelete({_id})
  }
}
