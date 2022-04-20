import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Welcome to backend!"', () => {
      expect(service.getData()).toEqual({ message: 'Welcome to backend!' });
    });

    it('should return new game board', () => {
      const bo = service.createBoard({ size: 5 });
      console.log(bo);
      expect(bo).toHaveLength(5);
      bo.forEach((element) => {
        expect(element).toHaveLength(5);
      });
    });
  });
});
