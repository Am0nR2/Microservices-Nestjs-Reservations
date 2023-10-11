import { Controller, Get } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePaymentsDto } from '@app/common';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}


  @MessagePattern("charge_payment")
  async createPayment(
    @Payload() amount : number
  ){
    return await this.paymentsService.createCharge(amount)
  }
}
