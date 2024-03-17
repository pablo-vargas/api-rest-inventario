import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeCompanyEntity} from 'src/entity/type-company.entity';
import { PaginateSwagger } from 'src/shared/paginate/query-paginate';
import { Repository } from 'typeorm';
import { CreateTypeCompanyDTO } from './dto/create-type-company.dto';

@Injectable()
export class TpyeCompanyService {

    constructor(
        @InjectRepository(TypeCompanyEntity) private typeCompanyEntity: Repository<TypeCompanyEntity>,

    ) {

    }


    async create(createTypeCompanyDTO: CreateTypeCompanyDTO): Promise<TypeCompanyEntity| { error: string[] }> {

        const company = this.typeCompanyEntity.create(createTypeCompanyDTO);
        return this.typeCompanyEntity.save(company);
    }
    
    async getAll(query: PaginateSwagger): Promise<any> {
        let [result,count] = await this.typeCompanyEntity.createQueryBuilder()
        .limit(query.limit||10)
        .offset(((query.page ||0)-1)*(query.limit||10))
        .getManyAndCount()
        return {
            data:result,
            total:count,
            page:query.page
        }
        
    }

    async getById(id: number): Promise<TypeCompanyEntity| { error: string[] }> {
        const company = await this.typeCompanyEntity.findOne({ where: { id } });
        if (!company) return { error: ["El registro no existe."] }
        return company;
    }

    async update(id: number, data: Partial<CreateTypeCompanyDTO>): Promise<TypeCompanyEntity| { error: string[] }> {
        await this.typeCompanyEntity.update(id, data);
        return await this.getById(id);
    }

    async delete(id: number): Promise<Object|{ error: string[] }  > {
        const company = await this.typeCompanyEntity.findOne({ where: { id } });
        if (!company) return { error: ["El registro no existe no existe."] }
        const result = await this.typeCompanyEntity.delete(id);
        if (result.affected === 0) return { error: ["Error al eliminar."] }
        return {}
    }
}
