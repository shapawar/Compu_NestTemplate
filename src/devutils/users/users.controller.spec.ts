/* 
* Nest and Third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* Custom imports
*/

describe('Users Controller', () => {
  
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
   
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('getUserList', () => {
    it('/users controller return json', () => {
     
    });
  });
});