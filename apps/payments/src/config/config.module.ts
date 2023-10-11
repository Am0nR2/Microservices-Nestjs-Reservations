import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule} from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports : [NestConfigModule.forRoot({
        isGlobal : true,
        validationSchema : Joi.object({
            PORT : Joi.number().required()
        })
    })]
})
export class ConfigModule {}
