import { Controller, Get, HttpException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CurrenciesService } from './currencies.service';

@Controller('currencies')
@ApiTags("currencies")
export class CurrenciesController {

    constructor(private service:CurrenciesService){}

    @Get()
    async getAll(){
        let items = await this.service.getAll()
        return {
            statusCode:200,
            message:["OK"],
            data:items
        }
    }
}
