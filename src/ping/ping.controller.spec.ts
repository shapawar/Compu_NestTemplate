import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';
import { AppService } from '../app.service';


describe('Ping Controller', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [PingController],
      providers: [AppService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<PingController>(PingController);
      expect(appController.sum()).toBe('Hello World!');
    });
  });

  describe('ping', () => {
    it('should return metadata', () => {
      const req = {
        "evUniqueID": "30f02cd5-aa6f-4873-8507-b9225dee8383",
        "errCode": 0,
        "errMsg": "Submitted Successfully"

      }
      const res = {}
      const appController = app.get<PingController>(PingController);
      expect(appController.ping(res)).toBe(req);
    });
  });

  describe('default middleware data',() => {
    it('s')
  })
});