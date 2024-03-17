import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from '../../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { AuthToken } from '../../shared/auth.token';
import { RoleUserEntity } from '../../entity/role-user.entity';
import { RoleEntity } from '../../entity/role.entity';


@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware, AuthToken],
  imports: [

    TypeOrmModule.forFeature([UserEntity,RoleUserEntity,RoleEntity]),
  
  ]
})
export class AuthModule { }
