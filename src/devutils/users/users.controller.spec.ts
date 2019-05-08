/* 
* Nest and Third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* Custom imports
*/
import { UsersController } from './users.controller';

describe('Users Controller', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
