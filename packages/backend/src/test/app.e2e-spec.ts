import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/board (POST)', () => {
    it('should return created board', async () => {
      const length = 5;
      const response = await request(app.getHttpServer())
        .post('/board')
        .send({ size: length })
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.body.board).toHaveLength(length);
      response.body.board.forEach((element) => {
        expect(element).toHaveLength(length);
      });
    });
  });
});
