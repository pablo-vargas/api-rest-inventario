import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entity/user.entity';
import { AuthToken } from 'src/shared/auth.token';
import { AuthSigInDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import {  SignUpDTO } from './dto/sign-up.dto';

@Injectable()
export class AuthService {

    private authToken:AuthToken = new AuthToken();
    constructor(
        @InjectRepository(UserEntity)
        private userEntity: Repository<UserEntity>,
        private jwtService: JwtService
     
    ) { 
    }

    async signIn(data:AuthSigInDTO){
        const hashedPassword = this.authToken.encryptSHA256(data.password);
        const user = await this.userEntity.findOne({where:{email:data.email},select:["firstName","lastName","email","emailVerified","password","id","rol","status"]})


        if(!user){
            throw new HttpException({ statusCode:400,message:["No existe un usuario con este correo."]},HttpStatus.FORBIDDEN);
        }else if(hashedPassword != user.password){
            throw new HttpException({statusCode:400,message:["La contraseña es incorrecta."]},HttpStatus.FORBIDDEN);
        }
        delete user.password
        
        const userObject = {
            ...user,
        }
        return {
            statusCode:200,
            message:["OK"],
            data:userObject,
            token:this.jwtService.sign(userObject)
        }

    }
    async refreshToken(user:any){
        return {
            statusCode:200,
            message:["OK"],
            token:this.jwtService.sign(user)
        }
    }

    async signUp(data:SignUpDTO){

        const existingUser = await this.userEntity.findOne({ where: { email: data.email }, select: ["email"] });
        if (existingUser) {
            throw new HttpException({ statusCode: 400, message: ["El correo ya está registrado."] }, HttpStatus.FORBIDDEN);
        }
    
        if (data.password !== data.verifyPassword) {
            throw new HttpException({ statusCode: 400, message: ["Las contraseñas no coinciden."] }, HttpStatus.FORBIDDEN);
        }
    
        const newUser = await this.userEntity.save({
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime(),
            ...data,
            rol: 1,
            emailVerified: 0,
            image: null
        });
    
        delete newUser.password;
    
        const token = this.jwtService.sign(newUser);
    
        return {
            statusCode: HttpStatus.OK,
            message: ["Registro insertado correctamente."],
            data: newUser,
            token: token
        };
    }
}
