import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../entity/user.entity';
import { DB_CONFIG, JWT_CONFIG } from '../../shared/config-global';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthToken } from '../../shared/auth.token';
import { AuthSigInDTO } from './dto/auth.dto';
import { RoleEntity } from '../../entity/role.entity';
import { RoleUserEntity } from '../../entity/role-user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let authToken: AuthToken;
  let userEntityRepository: Repository<UserEntity>;



  beforeEach(async () => {
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: jest.fn(() => 'mockedToken') } },
        { provide: AuthToken, useValue: { encryptSHA256: jest.fn() } },
        { provide: getRepositoryToken(UserEntity), useValue: { createQueryBuilder: jest.fn() } },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    authToken = module.get<AuthToken>(AuthToken);
    userEntityRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));

  });

  
  it('autenticacion valida y devuelve JWT', async () => {
    const hashedPassword = 'hashedPassword';
    const userData = { email: 'test@example.com', password: 'password' };
    const user = {
      id: 1,
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: [{ id: 1 }],
      status: 'active',
      updatedAt: new Date(),
    };

    jest.spyOn(authToken, 'encryptSHA256').mockReturnValueOnce(hashedPassword);
    jest.spyOn(userEntityRepository, 'createQueryBuilder').mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValueOnce(user),
    } as any);
    const token = await service.signIn(userData);
    expect(token).toEqual('mockedToken');
    expect(jwtService.sign).toHaveBeenCalledWith({
      id: 1,
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      roles: [1],
      status: 'active',
      updatedAt: user.updatedAt,
    });
  });

  it('Autenticacion invalida', async () => {
    const hashedPassword = 'hashedPassword';
    const userData = { email: 'test@example.com', password: 'password1' };

    jest.spyOn(authToken, 'encryptSHA256').mockReturnValueOnce(hashedPassword);
    jest.spyOn(userEntityRepository, 'createQueryBuilder').mockReturnValueOnce({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockResolvedValueOnce(null),
    } as any);
    const token = await service.signIn(userData);
    expect(token).toBeNull()
    
  });

});
