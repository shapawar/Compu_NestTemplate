import { Repository } from 'typeorm';
import { userEntity } from './user.entity';
import { LogService } from '../../middleware/logger.middleware';
export declare class UsersService {
    private readonly userRepository;
    private Logger;
    constructor(userRepository: Repository<userEntity>, Logger: LogService);
    MODULENAME: string;
    createUser(evUniqueID: any, data: any): Promise<any>;
    getUserList(evUniqueID: any): Promise<userEntity[]>;
    getUser(evUniqueID: any, userid: any): Promise<userEntity>;
    deleteUser(evUniqueID: any, userid: any): Promise<import("typeorm").DeleteResult>;
    editPost(evUniqueID: any, data: any): Promise<import("typeorm").UpdateResult>;
    registerUsers(evUniqueID: any, data: any): Promise<userEntity>;
    getUserData(evUniqueID: any): Promise<any>;
}
