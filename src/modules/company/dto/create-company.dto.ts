import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength,  } from "class-validator"
import { Message } from "../../../shared/messages-validator"

export class CreateCompanyDTO {
    @IsString({message:Message.isString})
    @IsNotEmpty({message:Message.isNotEmpty})
    @MaxLength(200,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: "Nombre empresa"
    })
    name: string;
  
    @IsString({message:Message.isString})
    @IsNotEmpty({message:Message.isNotEmpty})
    @MaxLength(100,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: "Nit"
    })
    nit: string;

    @IsNotEmpty({message:Message.isNotEmpty})
    @IsNumber({},{message:Message.isNumber})
    @ApiProperty({
        type: String,
        description: "Tipo Compañia"
    })
    typeIdCompany: number;
  
    @IsString({message:Message.isString})
    @IsNotEmpty({message:Message.isNotEmpty})
    @MaxLength(200,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: "Direccion"
    })
    address: string;
  
    /*@Column({ length: 200, nullable: true })
    logo: string;*/
  
    @IsOptional()
    @IsEmail({},{message:Message.isEmail})
    @ApiProperty({
        type: String,
        description: "Email"
    })
    email: string;
  
    @IsString({message:Message.isString})
    @IsOptional()
    @MaxLength(100,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: "Ciudad"
    })
    city: string;
  
    @IsString({message:Message.isString})
    @IsOptional()
    @MaxLength(500,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: ""
    })
    footerPrint: string;
  
    @IsString({message:Message.isString})
    @IsOptional()
    @MaxLength(500,{message:Message.maxLength})
    @ApiProperty({
        type: String,
        description: ""
    })
    headerPrint: string;
  
    
    status: number;
  
   
    createdAt: number = new Date().getTime();
  
    
    updatedAt: number= new Date().getTime();
  
}
