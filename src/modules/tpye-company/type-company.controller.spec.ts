import { Test, TestingModule } from '@nestjs/testing';
import { TpyeCompanyController } from './type-company.controller';

describe('TpyeCompanyController', () => {
  let controller: TpyeCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TpyeCompanyController],
    }).compile();

    controller = module.get<TpyeCompanyController>(TpyeCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
