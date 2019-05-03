import { UserPostDTO } from '../users/user.post.dto';
import { LoginService } from './login.service';
export declare class LoginController {
    private loginService;
    constructor(loginService: LoginService);
    loginCheck(res: any): void;
    loginPost(res: any, req: any, UserPostDTO: UserPostDTO): Promise<void>;
}
