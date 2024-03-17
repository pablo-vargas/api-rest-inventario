import { Test, TestingModule } from '@nestjs/testing';
import { TpyeCompanyService } from './type-company.service';

describe('TpyeCompanyService', () => {
  let service: TpyeCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpyeCompanyService],
    }).compile();

    service = module.get<TpyeCompanyService>(TpyeCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
