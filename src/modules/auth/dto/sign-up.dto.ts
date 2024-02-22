import { ApiProperty } from "@nestjs/swagger"

export class SignUpDTO{
    @ApiProperty({
        type:String,
        description:"Email"
    })
    email:string

    @ApiProperty({
        type:String,
        description:"Password"
    })
    password:string
    @ApiProperty({
        type:String,
        description:"verifyPassword"
    })
    verifyPassword:string

    @ApiProperty({
        type:String,
        description:"name"
    })
    firstName:string

    @ApiProperty({
        type:String,
        description:"surName"
    })
    lastName:string
}