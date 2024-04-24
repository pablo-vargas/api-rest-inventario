import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/shared/role/role.guard';
import { Roles } from 'src/shared/role/roles.decorator';
import { TpyeCompanyService } from './type-company.service';
import { CreateTypeCompanyDTO } from './dto/create-type-company.dto';
import { PaginateSwagger } from 'src/shared/paginate/query-paginate';
import { ApiOkResponsePaginated, ResponseDTO, ResponsePaginateDTO } from 'src/shared/response.dto';

@Controller('type-company')
@ApiTags("Tipo empresas")
@ApiBearerAuth("authorization")
@Roles(Role.ADMIN)
@ApiResponse({type:ResponseDTO})
export class TpyeCompanyController {

    constructor(private readonly typeCompanyService: TpyeCompanyService) { }

    @Post()
    async create(@Body() createTypeCompanyDTO: CreateTypeCompanyDTO) {
        let result = await this.typeCompanyService.create(createTypeCompanyDTO);
        if ('error' in result)  throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);
        return {
            statusCode: HttpStatus.OK,
            message: ["Creado correctmente"],
            data: result
        }
    }


    @ApiOperation({ summary: "PAGINACION TABLA TIPO EMPRESAS" })
    @ApiOkResponsePaginated(CreateTypeCompanyDTO)
    @Get()
    async getAll(@Query() queryParams: PaginateSwagger) {

        let rows = await this.typeCompanyService.getAll(queryParams);
        return {
            statusCode: HttpStatus.OK,
            message: ["OK"],
            ...rows
        }
    }

    @Get(':id')
    async getById(@Param('id') id: number) {
        let result = await this.typeCompanyService.getById(id);
        if ('error' in result) throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);
        return {
            statusCode: HttpStatus.OK,
            message: ["OK"],
            data: result
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() updateCompanyDTO: Partial<CreateTypeCompanyDTO>,
    ) {
        let result = await this.typeCompanyService.update(id, updateCompanyDTO);
        if ('error' in result) throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);
        return {
            statusCode: HttpStatus.OK,
            message: ["Modificado correctamente"],
            data: result
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        let result = await this.typeCompanyService.delete(id);
        if ('error' in result) throw new HttpException({ statusCode: HttpStatus.FORBIDDEN, message: result.error }, HttpStatus.FORBIDDEN);
        return {
            statusCode: HttpStatus.OK,
            message: ["Eliminado correctamente"]
        }
    }

}
