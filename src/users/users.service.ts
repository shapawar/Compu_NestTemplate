import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(userEntity) private readonly userRepository : Repository<userEntity>){}

    async createUser(data): Promise<userEntity>{
        const savedata = await this.userRepository.save(data);
        return savedata
    }

    async getUserList(){
        const list = await this.userRepository.find();
        return list;
    }

    async getUser(userid){
        const details = await this.userRepository.findOne({username:userid});
        return details;
    }
 

}
