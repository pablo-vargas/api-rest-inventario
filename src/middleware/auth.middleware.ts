import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService:JwtService){}
    use(req: Request, res: Response, next: NextFunction) {
        if(req.baseUrl.includes("auth/signin")) return next()
        if(req.baseUrl.includes("auth/signup")) return next()
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            //const decode =this.jwtService.decode(token)
            try {
                const verify =this.jwtService.decode(token)
                const expiracion = new Date(verify.exp * 1000);
                const ahora = new Date();
                if(expiracion> ahora){
                    req["user"] = verify
                    return next();
                }else{
                    return res.status(HttpStatus.UNAUTHORIZED).send({statusCode:HttpStatus.UNAUTHORIZED,message:["Token expirado."]})
                }
            } catch (error) {
                Logger.log(`**************************** erro**************`)
                console.log(error)
                return res.status(HttpStatus.UNAUTHORIZED).send({statusCode:HttpStatus.UNAUTHORIZED,message:["Token inválido."]})
            }
        }
        return res.status(HttpStatus.UNAUTHORIZED).send({statusCode:HttpStatus.UNAUTHORIZED,message:["Token inválido."]})

    }
}