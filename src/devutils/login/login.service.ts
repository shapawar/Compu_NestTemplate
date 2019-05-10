import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from 'dist/src/users/user.entity';
const jwt = require('jsonwebtoken');

/* Login Service */
@Injectable()
export class LoginService {
    constructor(@InjectRepository(userEntity) private readonly userReposity: Repository<userEntity>){

    }

    /* Check login credential of user using 'username' & 'Password' */
    async checkLogin(data){
     const checkUser = await this.userReposity.findOne({username:data.username, password:data.password});
     return checkUser;
    }

    async generateJWT(data){

        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);
    
        return jwt.sign({
          username: data.username,
          exp: exp.getTime() / 1000,
        }, process.env.JWTSECRET); 
    }
}

