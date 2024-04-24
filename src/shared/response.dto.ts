import { Type, applyDecorators } from "@nestjs/common"
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from "@nestjs/swagger"

export class ResponseDTO<T>{
    @ApiProperty({type:Number,description:"200, 201,401,403,500 HTTP_STATUS"})
    statusCode:number

    @ApiProperty({type:[String],description:"Messages"})
    message:string[]

    @ApiProperty({type:Object,description:"Messages"})
    data:T
}

export class ResponsePaginateDTO<T>{
    @ApiProperty({type:Number,description:"200, 201,401,403,500 HTTP_STATUS"})
    statusCode:number

    @ApiProperty({type:[String],description:"Messages"})
    message:string[]

    @ApiProperty({
        description: 'Data object of type T',
        })
    data:T[]

    @ApiProperty({type:Number,description:"total items"})
    total:number
    @ApiProperty({type:Number,description:"Pagina actual"})
    page:number
}


export const ApiOkResponsePaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(ResponsePaginateDTO, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponsePaginateDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )