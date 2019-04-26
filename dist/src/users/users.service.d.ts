import { userEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserPostDTO } from './user.post.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<userEntity>);
    createUser(userPostDTO: UserPostDTO): Promise<userEntity>;
}
