import { Module } from '@nestjs/common';
import { TpyeCompanyController } from './type-company.controller';
import { TpyeCompanyService } from './type-company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCompanyEntity } from 'src/entity/type-company.entity';

@Module({
  controllers: [TpyeCompanyController],
  providers: [TpyeCompanyService],
  imports:[
    TypeOrmModule.forFeature([TypeCompanyEntity])
  ]
})
export class TpyeCompanyModule {}
