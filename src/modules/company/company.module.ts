import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeCompanyEntity } from 'src/entity/type-company.entity';
import { CompanyEntity } from 'src/entity/company.entity';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from 'src/shared/role/role.guard';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },],
  imports:[
    TypeOrmModule.forFeature([TypeCompanyEntity,CompanyEntity])
  ]
})
export class CompanyModule {}
