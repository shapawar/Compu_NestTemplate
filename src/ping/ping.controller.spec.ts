import { Test, TestingModule } from '@nestjs/testing';
import { PingController } from './ping.controller';
import { AppService } from '../app.service';
import { Req } from '@nestjs/common';



describe('Ping Controller', () => {
 
  let pingController: PingController;
  let appService: AppService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [PingController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
    pingController = module.get<PingController>(PingController);

  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      
    });
  });

  describe('ping controller test', () => {
    it('should return default metadata', async () => {
      const metadata = {
          errCode:0,
        }
      let test = pingController.ping(Req);
      expect(test.errCode).toBe(metadata.errCode);
    });
  });
});