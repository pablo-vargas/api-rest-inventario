import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {



    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    //controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService)
    controller = new AuthController(authService)
  });
  

  describe('signin', () => {
    it('Sign In', async () => {
      const result:any = {};
      jest.spyOn(authService, 'signIn').mockImplementation(() => result);

      expect(await controller.signIn({email:"",password:""})).toBe(result);
    });
  });
});
