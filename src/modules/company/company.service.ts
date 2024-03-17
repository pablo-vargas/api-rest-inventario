import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/entity/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { TypeCompanyEntity } from 'src/entity/type-company.entity';
import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { PaginateSwagger } from 'src/shared/paginate/query-paginate';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(CompanyEntity) private companyEntity: Repository<CompanyEntity>,
        @InjectRepository(TypeCompanyEntity) private typeCompanyEntity: Repository<TypeCompanyEntity>,

    ) {

    }

    async createCompany(createCompanyDTO: CreateCompanyDTO): Promise<CompanyEntity | { error: string[] }> {
        let typeCompany = await this.typeCompanyEntity.findOne({ where: { id: createCompanyDTO.typeIdCompany } })
        if (!typeCompany) return { error: ["El tipo de compañia no existe."] }

        const company = this.companyEntity.create(createCompanyDTO);
        company.typeCompany = typeCompany
        return this.typeCompanyEntity.save(company);
    }

    async getAllCompanies(query: PaginateSwagger): Promise<any> {
        let [result,count] = await this.companyEntity.createQueryBuilder("table")
        .leftJoinAndSelect('table.typeCompany', 'type')        
        .limit(query.limit||10)
        .offset(((query.page ||0)-1)*(query.limit||10))
        .getManyAndCount()
        return {
            data:result,
            total:count,
            page:query.page
        }
        
    }

    async getCompanyById(id: number): Promise<CompanyEntity | { error: string[] }> {
        const company = await this.companyEntity.findOne({ where: { id } });
        if (!company) return { error: ["La empresa no existe."] }
        return company;
    }

    async updateCompany(id: number, data: Partial<CreateCompanyDTO>): Promise<CompanyEntity | { error: string[] }> {
        await this.companyEntity.update(id, data);
        return await this.getCompanyById(id);
    }

    async deleteCompany(id: number): Promise<{ error: string[] }> {
        const result = await this.companyEntity.delete(id);
        if (result.affected === 0) return { error: ["La empresa no existe"] }
        return
    }
}
