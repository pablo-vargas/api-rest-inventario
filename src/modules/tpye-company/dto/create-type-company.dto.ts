import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength,  } from "class-validator"
import { Message } from "../../../shared/messages-validator"

export class CreateTypeCompanyDTO {
    @IsString({message:Message.isString})
    @IsNotEmpty({message:Message.isNotEmpty})
    @MaxLength(50,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: "Descripcion tipo empresa"
    })
    description: string;
  
  
}
