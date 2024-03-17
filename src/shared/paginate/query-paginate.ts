import { ApiOperation, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";
import { Message } from "../messages-validator";
import { Type } from "class-transformer";

export class PaginateSwagger{
    @Type(()=>Number)
    @IsOptional()
    @IsNumber({},{message:Message.isNumber})
    @ApiProperty({type:Number,required:false,description:"Numero de pagina",default:1})
    page?:number

    @Type(()=>Number)
    @IsOptional()
    @IsNumber({},{message:Message.isNumber})
    @ApiProperty({type:Number,required:false,description:"Cantidad de registros por pagina",default:10})
    limit?:number

}