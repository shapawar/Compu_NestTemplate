import { Test } from '@nestjs/testing';
import { PingController } from './ping.controller';
import { AppService } from '../app.service';
import { Req } from '@nestjs/common';
import { DefaultMiddleware } from '../middleware/default.middleware';



describe('Ping Controller', () => {
  let pingcontroller: PingController;
  let appservice: AppService;
  let middleware: DefaultMiddleware;
 

  beforeEach(async () => {

    const module = await Test.createTestingModule({

      controllers: [PingController],
      providers: [AppService],

    }).compile();

    appservice = module.get<AppService>(AppService);
    pingcontroller = module.get<PingController>(PingController);

  });

  describe('ping', () => {

    it('should return object of ping method', async () => {

      const result = {
        requestURL: "",
        evUniqueID: "",
        requestTS: 0,
        elapsedTimeInMS: 0,
        apiServer: "",
        apiBuildVersion: "",
        errCode: 1,
        errMsg: "",
        timestamp: "",
        tasks: []
      }

      jest.spyOn(appservice, 'endMetaData').mockImplementation(() => result);

      expect(await pingcontroller.ping(Req)).toBe(result)
    });

  });

});


/* describe('Ping Controller', () => {
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
      expect(appController.getHello()).toBe('Hello World!');
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
}); */