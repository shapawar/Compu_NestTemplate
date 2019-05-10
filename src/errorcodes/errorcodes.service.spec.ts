import { Test, TestingModule } from '@nestjs/testing';
import { ErrorcodesService } from './errorcodes.service';

describe('ErrorcodesService', () => {
  let service: ErrorcodesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorcodesService],
    }).compile();

    service = module.get<ErrorcodesService>(ErrorcodesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
