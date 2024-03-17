import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { Message } from "../../../shared/messages-validator"

export class AuthSigInDTO {
    @IsNotEmpty({message:Message.isNotEmpty})
    @IsEmail({},{message:Message.isEmail})
    @ApiProperty({
        type: String,
        description: "Email"
    })
    email: string

    @IsString({message:Message.isString})
    @IsNotEmpty({message:Message.isNotEmpty})
    @MinLength(8,{message:Message.minLength})
    @ApiProperty({
        type: String,
        description: "Password"
    })
    password: string
}

export class AuthSigInResponseDTO {
    @ApiProperty({
        type: Number,
        description: "HTTP_STATUS 200,400,403,500"
    })
    statusCode: number

    @ApiProperty({
        type: [String],
        description: "ERORES"
    })
    message: string[]
    @ApiProperty({
        type: String,
        description: "JWT BASE 64"
    })
    token: string
}