import { Controller, Body, Post, HttpCode, Get, Header, Headers, Logger, Req, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiParam, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthSigInDTO, AuthSigInResponseDTO } from './dto/auth.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
@ApiTags("AUTENTICACION")
export class AuthController {

    constructor(private authService: AuthService) { }


    @ApiBody({
        type: AuthSigInDTO
    })
    @ApiResponse({ type: AuthSigInResponseDTO })
    @ApiOperation({ summary: 'SignIn', description: '' })
    @Post('signin')
    @HttpCode(200)
    async signIn(@Body() data: AuthSigInDTO) {
        let token = await this.authService.signIn(data)
        if (!token) throw new HttpException(["Usuario y/o contraseña incorrecto"], HttpStatus.FORBIDDEN)
        return {
            statusCode:HttpStatus.OK,
            message:["OK"],
            token
        }

    }
    /*
        @ApiOperation({ summary: 'Refresh Token', description: '' })
        @Get('refresh-token')
        @ApiBearerAuth("authorization")
        @HttpCode(200)
    
        refreshToken(@Req() request:any) {
            let user = request.user
            delete user.exp
            delete user.iat
            return this.authService.refreshToken(user)
        }*/


   /* @ApiBody({
        type: SignUpDTO
    })
    @ApiOperation({ summary: 'SignUp', description: '' })
    @Post('signup')
    @HttpCode(200)
    async signUp(@Body() data: SignUpDTO) {
        let {error,token} = await this.authService.signUp(data);
        if(error)  throw new HttpException(error, HttpStatus.FORBIDDEN)
        return {
            statusCode:HttpStatus.OK,
            message:["OK"],
            token
        }

    }
*/
}
