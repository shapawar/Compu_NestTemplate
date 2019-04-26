import { UserPostDTO } from './user.post.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    addPost(res: any, userpostdto: UserPostDTO): Promise<any>;
}
