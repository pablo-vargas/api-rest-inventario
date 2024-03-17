import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { AuthToken } from '../../shared/auth.token';
import { AuthSigInDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserAuth } from 'src/interfaces/auth.dto';
import { RoleUserEntity } from 'src/entity/role-user.entity';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private userEntity: Repository<UserEntity>,
        private jwtService: JwtService,
        private authToken: AuthToken,
    ) {
    }

    async signIn(data: AuthSigInDTO):Promise<String> {
        const hashedPassword = this.authToken.encryptSHA256(data.password);
        const user = await this.userEntity.createQueryBuilder('u')
        .leftJoinAndSelect('u.roles', 'roles')
        .leftJoinAndSelect('roles.role', 'r')

        .select(['u.id','u.email', 'u.firstName', 'u.lastName', 'roles.id',"u.status","u.updatedAt"])
        .where("u.email=:email",{email:data.email})
        .andWhere("u.password=:pwd",{pwd:hashedPassword})
        .getOne()
   

        if (!user) return null
        const userObject = {
            ...user,
            roles: user.roles.map(x=>x.id)
        }
        return this.jwtService.sign(userObject)
    }
    async refreshToken(user: UserEntity) {
        return {
            statusCode: 200,
            message: ["OK"],
            token: this.jwtService.sign(user)
        }
    }

    /*async signUp(data: SignUpDTO) {

        const existUser = await this.userEntity.findOne({where:{ email: data.email} })
        if (existUser) return {error: ["El correo ya está registrado."]}

        if (data.password !== data.verifyPassword) return  {error: ["Las contraseñas no coinciden."] }

        data.password = this.authToken.encryptSHA256(data.password)
        const newUser = await this.userEntity.save(data)
        const userData = {
            id: newUser.id,
            email: newUser.email,
        };
        const token = this.jwtService.sign(userData);

        return await this.signIn()
    }*/
}
