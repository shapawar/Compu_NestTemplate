import { UserPostDTO } from './user.post.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    addPost(res: any, userpostdto: UserPostDTO): Promise<any>;
    getUserList(res: any): Promise<any>;
    getUser(res: any, userID: any): Promise<any>;
    deleteUser(res: any, userID: any): Promise<any>;
    updateUser(res: any, userPostDTO: UserPostDTO): Promise<any>;
}
