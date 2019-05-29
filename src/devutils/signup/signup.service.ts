/* 
* Nest and Third party imports
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/* 
* Custom imports
*/
import { LogService } from '../../service/logger.service';
import { signup } from './entity/signup.entity';

/* 
* SignUp Service
*/
@Injectable()
export class SignupService {

    MODULENAME = 'SignupService';
    constructor(@InjectRepository(signup) private readonly userRepository: Repository<signup>, private logger: LogService) { }

    /**
     * create user
     * @param {*} evUniqueID EV unique id
     * @param {*} data is a req data
     */
    async createUser(evUniqueID, data) {
        let taskName = 'createUser';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const checkuser = await this.userRepository.findOne({ username: data.username });
            if (checkuser == undefined) {

                const savedata = await this.userRepository.save(data);
                return savedata;

            } else {

                throw new Error(`Username is already present plz try another !!!`);
            }

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }
}
