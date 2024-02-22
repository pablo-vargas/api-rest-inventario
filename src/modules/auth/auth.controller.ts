import { Controller, Body, Post, HttpCode, Get, Header, Headers, Logger, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiHeaders, ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthSigInDTO } from './dto/auth.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Controller('auth')
@ApiTags("auth")
export class AuthController {

    constructor(private authService: AuthService) { }


    @ApiBody({
        type: AuthSigInDTO
    })
    @ApiOperation({ summary: 'SignIn', description: '' })
    @Post('signin')
    @HttpCode(200)
    signIn(@Body() data: AuthSigInDTO) {
        return this.authService.signIn(data);
    }

    @ApiOperation({ summary: 'Refresh Token', description: '' })
    @Get('refresh-token')
    @ApiBearerAuth("authorization")
    @HttpCode(200)

    refreshToken(@Req() request:any) {
        let user = request.user
        delete user.exp
        delete user.iat
        return this.authService.refreshToken(user)
    }


    @ApiBody({
        type: SignUpDTO
    })
    @ApiOperation({ summary: 'SignUp', description: '' })
    @Post('signup')
    @HttpCode(200)
    signUp(@Body() data: SignUpDTO) {
        return this.authService.signUp(data);
    }

}
