import { Test, TestingModule } from '@nestjs/testing';
import { EntityValidatorService } from './entity-validator.service';

describe('EntityValidatorService', () => {
  let service: EntityValidatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntityValidatorService],
    }).compile();

    service = module.get<EntityValidatorService>(EntityValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
