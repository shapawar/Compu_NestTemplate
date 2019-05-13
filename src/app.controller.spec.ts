/* 
* NEST & third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* custom imports
*/
import { AppController } from './app.controller';


describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
     
    });
  });
});