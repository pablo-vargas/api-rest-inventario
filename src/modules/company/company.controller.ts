import { Body, Controller, Delete, Get, HttpException, HttpStatus, Logger, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/shared/role/roles.decorator';
import { Role } from 'src/shared/role/role.guard';
import { ApiPaginationQuery, FilterOperator, PaginateQuery, PaginatedSwaggerDocs } from 'nestjs-paginate';
import { PaginateSwagger } from 'src/shared/paginate/query-paginate';


@Controller('company')
@ApiTags("EMPRESAS")
@ApiBearerAuth("authorization")
@Roles(Role.ADMIN)
export class CompanyController {

    constructor(private readonly companyService: CompanyService) { }

    @Post()
    async createCompany(@Body() createCompanyDTO: CreateCompanyDTO) {
        let result = await this.companyService.createCompany(createCompanyDTO);
        if ('error' in result) throw new HttpException(result.error, HttpStatus.FORBIDDEN);
        return {
            statusCode:HttpStatus.OK,
            message:["Creado correctmente"],
            data:result
        }
    }

 
    @ApiOperation({summary:"PAGINACION TABLA EMPRESAS"})
    @Get()
    async getAllCompanies(@Query() queryParams: PaginateSwagger) {
       
        let rows =await  this.companyService.getAllCompanies(queryParams);
        return {
            statusCode:HttpStatus.OK,
            message:["OK"],
            ...rows
        }
    }

    @Get(':id')
    @Roles(Role.ADMIN,Role.MANAGEMENT)
    async getCompanyById(@Param('id') id: number){
        let result = await this.companyService.getCompanyById(id);
        if ('error' in result) throw new HttpException(result.error, HttpStatus.FORBIDDEN);
        return {
            statusCode:HttpStatus.OK,
            message:["OK"],
            data:result
        }
    }

    @Put(':id')
    @Roles(Role.ADMIN,Role.MANAGEMENT)
    async updateCompany(
        @Param('id') id: number,
        @Body() updateCompanyDTO: Partial<CreateCompanyDTO>,
    ) {
        let result =  this.companyService.updateCompany(id, updateCompanyDTO);
        if ('error' in result) throw new HttpException(result.error, HttpStatus.FORBIDDEN);
        return {
            statusCode:HttpStatus.OK,
            message:["Modificado correctamente"],
            data:result
        }
    }

    @Delete(':id')
    @Roles(Role.MANAGEMENT)
    async deleteCompany(@Param('id') id: number) {
        let result =  this.companyService.deleteCompany(id);
        if ('error' in result) throw new HttpException(result.error, HttpStatus.FORBIDDEN);
        return {
            statusCode:HttpStatus.OK,
            message:["Creado correctmente"],
            data:result
        }
    }
}
