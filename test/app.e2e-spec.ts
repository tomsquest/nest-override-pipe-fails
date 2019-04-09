import { Test, TestingModule } from '@nestjs/testing';
import 'reflect-metadata';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MyPipe } from '../src/my-pipe';

describe('AppController (e2e)', () => {
  let app;
  let fakePipe: MyPipe;

  beforeEach(async () => {
    fakePipe = {} as MyPipe;

    /*
     * With this line, the test passes
     */
    fakePipe.transform = jest.fn().mockReturnValue('fake-pipe');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overridePipe(MyPipe)
      .useValue(fakePipe)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    /*
     * With this line, the test fails
     */
    fakePipe.transform = jest.fn().mockReturnValue('fake-pipe');

    return request(app.getHttpServer())
      .get('/hello')
      .expect(200)
      .expect('fake-pipe');
  });
});
