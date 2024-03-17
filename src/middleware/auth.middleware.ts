import { HttpException, HttpStatus, Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    private excludedPaths: string[] = ['/api/v1/auth/signin', '/api/v1/auth/signup'];

    constructor(private jwtService:JwtService){}
    use(req: Request, res: Response, next: NextFunction) {
        if (this.excludedPaths.includes(req.path)) {
            return next();
        }
        const authHeader = req.headers['authorization'];
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            try {
                const verify =this.jwtService.decode(token)
                const exp = new Date(verify.exp * 1000);
                const currentDate = new Date();
                if(exp> currentDate){
                    req["user"] = verify
                    return next();
                }else{
                    return res.status(HttpStatus.UNAUTHORIZED).send({statusCode:HttpStatus.UNAUTHORIZED,message:["Token expirado."]})
                }
            } catch (error) {
                return res.status(HttpStatus.UNAUTHORIZED).send({statusCode:HttpStatus.UNAUTHORIZED,message:["Token inválido."]})
            }
        }
        return res.status(HttpStatus.UNAUTHORIZED).send({statusCode:HttpStatus.UNAUTHORIZED,message:["Token inválido."]})

    }
}