import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';

@Module({
    imports : [MongooseModule.forRootAsync({
        useFactory : (configService : ConfigService) => {
            return {
                uri : configService.getOrThrow("MONGODB_URI")
            }
        },
        inject : [ConfigService]
    })]
})
export class DatabaseModule {
    static forFeature(models : ModelDefinition[]){
        return MongooseModule.forFeature(models)
    }
}
