import { Test, TestingModule } from '@nestjs/testing';
import { LellochatController } from './lellochat.controller';
import { LellochatService } from './lellochat.service';

describe('LellochatController', () => {
  let controller: LellochatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LellochatController],
      providers: [LellochatService],
    }).compile();

    controller = module.get<LellochatController>(LellochatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
