import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports : [NestConfigModule.forRoot({
        isGlobal : true,
        validationSchema : Joi.object({
            MONGODB_URI : Joi.string().required(),
            JWT_SECRET : Joi.string().required(),
            JWT_EXPIRE : Joi.string().required(),
            HTTP_PORT : Joi.string().required(),
            TCP_PORT : Joi.string().required()
        })
    })]
})
export class ConfigModule {}
