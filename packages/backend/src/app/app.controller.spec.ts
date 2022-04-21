import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getTick', () => {
    //
  });
});
