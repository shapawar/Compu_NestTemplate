/* 
* NEST & third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* custom imports
*/
import { AppController } from './app.controller';
import { AppService } from './app.service';


describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule 
  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

  
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
     expect(appController.sum()).toBe('Hello World!');
    });
  });
});