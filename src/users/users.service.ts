import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './user.entity';
import { Repository, getManager } from 'typeorm';


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

    async deleteUser(userid){
        console.log("check userid"+userid);
        const user = await this.userRepository.delete({username:userid});
        return user;
    }
 
    async editPost(data) {
    
        const editedPost = await this.userRepository.update({username:data.username},data);
        return editedPost;
    }

    //noorm method
    async createUsers(data): Promise<userEntity>{
        const savedata = await getManager().query(`INSERT INTO user_entity(username, email, mobile, password, address) VALUES ('${data.username}','${data.email}','${data.mobile}','${data.password}','${data.address}')`);
        return savedata;
    }

    async getUserData(){
        const list = await  getManager().query(`SELECT * FROM user_entity`);
        return list;
    }

}
