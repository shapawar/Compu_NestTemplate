import { Repository } from 'typeorm';
import { userEntity } from 'dist/src/users/user.entity';
export declare class LoginService {
    private readonly userReposity;
    constructor(userReposity: Repository<userEntity>);
    checkLogin(data: any): Promise<userEntity>;
    generateJWT(data: any): Promise<any>;
}
