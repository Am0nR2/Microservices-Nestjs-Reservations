import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from "nodemailer"

@Injectable()
export class NotificationsService {
    constructor(
      private readonly configService : ConfigService 
    ){}

    private readonly transporter = nodemailer.createTransport({
      service : "gmail",
      host : "smtp.gmail.com",
      port : 587,
      secure : false,
      auth : {
        user : this.configService.get("GMAIL_USER"),
        pass : this.configService.get("GMAIL_APP_PASSWORD")
      }
    });

    async sendMail(data){
      const message = {
        msg:  "Reservation info",
        reservation :data.reservation.toString()
      }
      delete data.reservation.created_at
      delete data.reservation.updated_at

      const html = Object.entries(data.reservation).map(entry => {
       return `<p>${entry[0]} : ${entry[1]}</p>`
      }).join(" ")
      await this.transporter.sendMail({
        from : this.configService.getOrThrow("GMAIL_USER"),
        to : data.email,
        subject : "Your Reservation Has Been created",
        text : "Your Reservation Has Been Created",
        html  
      })
    }
}
