import { userEntity } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<userEntity>);
    createUser(data: any): Promise<userEntity>;
    getUserList(): Promise<any>;
    getUser(userid: any): Promise<any>;
    deleteUser(userid: any): Promise<any>;
    editPost(data: any): Promise<any>;
}
