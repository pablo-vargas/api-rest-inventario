import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, HttpException, HttpStatus,createParamDecorator  } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthToken } from './auth.token';

@Injectable()
export class TokenInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // Acceder a la solicitud
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    let authToken = new AuthToken()
    const headers = request.headers;
    const token = headers['authorization']??null; 
    if(request.url != "/api/v1/auth/signin"){
        if(!token) throw new HttpException({ statusCode: 401, message: ['Acceso no autorizado!'] }, HttpStatus.UNAUTHORIZED);

        var  user = authToken.decrypt(token)
        if(!user) throw new HttpException({ statusCode: 401, message: ['Acceso denegado!'] }, HttpStatus.UNAUTHORIZED);

        request.user = user;

    }
    return next.handle();
  }
}
export const GetUserAuth = createParamDecorator(
    (data:any,context:ExecutionContext)=>{
        let authToken = new AuthToken()

        const req = context.switchToHttp().getRequest();
     
        return req.user
    }
)