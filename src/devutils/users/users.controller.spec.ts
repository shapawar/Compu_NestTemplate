/* 
* Nest and Third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* Custom imports
*/
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Res, Req } from '@nestjs/common';

describe('Users Controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('getUserList', () => {
    it('should return an array of users', async () => {
      const result: any = [
        {

          username: 'Safal@1234',
          email: 'noorm@gamil.com',
          mobile: 8857880616,
          password: 'noorm123',
          address: 'noorm'
        }
      ];

      jest.spyOn(usersService, 'getUserList').mockImplementation(() => result);
      expect(await usersController.getUserList(Req, Res)).toBe(result);

    });
  });
});
