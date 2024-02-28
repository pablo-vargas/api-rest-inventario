import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { CurrencyEntity } from './entity/currency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  imports:[
    HttpModule,
    TypeOrmModule.forFeature([CurrencyEntity]),
    
  ]
})
export class CurrenciesModule {}
