import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from "joi"

@Module({
    imports : [NestConfigModule.forRoot({
        isGlobal : true,
        validationSchema : Joi.object({
            MONGODB_URI : Joi.string().required(),
            AUTH_PORT : Joi.number().required(),
            AUTH_HOST : Joi.string().required(),
            PAYMENT_PORT : Joi.number().required(),
            PAYMENT_HOST : Joi.string().required(),
            NOTIFICATION_PORT : Joi.number().required(),
            NOTIFICATION_HOST : Joi.string().required()
        })
    })]
})
export class ConfigModule {}
