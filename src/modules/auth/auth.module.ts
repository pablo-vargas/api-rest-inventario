import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMiddleware } from 'src/middleware/auth.middleware';


@Module({
  controllers: [AuthController],
  providers: [AuthService,AuthMiddleware],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
   
  ]
})
export class AuthModule {}
