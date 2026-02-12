import { Test, TestingModule } from '@nestjs/testing';
import { LellochatService } from './lellochat.service';

describe('LellochatService', () => {
  let service: LellochatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LellochatService],
    }).compile();

    service = module.get<LellochatService>(LellochatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
