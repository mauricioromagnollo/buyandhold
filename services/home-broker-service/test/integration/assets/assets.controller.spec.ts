import { Test, TestingModule } from '@nestjs/testing';
import { AssetsController } from '../../../src/assets/assets.controller';
import { AssetsService } from '../../../src/assets/assets.service';

describe('AssetsController', () => {
  let controller: AssetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [AssetsService],
    }).compile();

    controller = module.get<AssetsController>(AssetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
