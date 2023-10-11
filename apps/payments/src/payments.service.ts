import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';
import { CreatePaymentsDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(this.configService.getOrThrow("STRIPE_SECRET_KEY"), {
    apiVersion : "2023-08-16"
  })
  
  constructor(
    private readonly configService : ConfigService
  ){}

  async createCharge(amount : number){

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method : "pm_card_visa",
      amount : amount*100,
      confirm : true,
      payment_method_types : ["card"],
      currency : "try",
    })
    return paymentIntent
  }
}
