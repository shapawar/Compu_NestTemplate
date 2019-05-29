/* 
* NEST js & third party imports
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
const jwt = require('jsonwebtoken');

/* 
* Custom imports
*/
import { signup } from '../signup/entity/signup.entity';
import { LogService } from '../../service/logger.service';


@Injectable()
export class SigninService {
    MODULENAME = 'SigninService';

    constructor(@InjectRepository(signup) private readonly userReposity: Repository<signup>, private Logger: LogService) {

    }

    /**
     * 
     * @param (string)evUniqueID 
     * @param(JSON OBJ) data 
     */
    async checkLogin(evUniqueID, data) {
        let taskName = 'checkLogin';

        try {

            this.Logger.debug(`[${evUniqueID}] (${this.MODULENAME}) - ${taskName} - body param: ${JSON.stringify(data)}`);

            const checkUser = await this.userReposity.findOne({ username: data.username, password: data.password });
            return checkUser;

        } catch (error) {

            this.Logger.error(`[${evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }

    /**
     * 
     * @param evUniqueID 
     * @param data 
     */
    async generateJWT(evUniqueID, data) {
        let taskName = 'generateJWT';

        try {
            this.Logger.debug(`[${evUniqueID}] (${this.MODULENAME}) - ${taskName} - BodyParam: ${JSON.stringify(data)}`);

            let today = new Date();
            let exp = new Date(today);
            exp.setDate(today.getDate() + 60);

            return jwt.sign({
                username: data.username,
                exp: exp.getTime() / 1000,
            }, process.env.JWTSECRET);

        } catch (error) {

            this.Logger.error(`[${evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;

        }

    }

}
