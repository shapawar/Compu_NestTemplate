/* 
* Nest and Third party imports
*/
import { Test, TestingModule } from '@nestjs/testing';

/* 
* Custom imports
*/
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

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

  test('getUserList', () => {
    // it('should return an array of users', async () => {
    //   const result:any = [
    //     {
    
    //     "username": 'Safal@1234',
    //      "email": 'noorm@gamil.com',
    //      "mobile": 8857880616,
    //      "password": 'noorm123',
    //      "address": 'noorm'
    //   }
    // ];
      
    // expect.assertions(1);
     usersController.getUserList(null,null).then(data => {
      expect(data.username).toEqual('Safal@1234');
    })
      // jest.spyOn(usersService,'getUserList').mockImplementation(() => result);
      // expect(await usersController.getUserList(result,null)).toBe(result);
      // return usersController.getUserList(result,null).then(data => {
      //   expect(data).toBe(result);
      // });
    });
  // });
});
