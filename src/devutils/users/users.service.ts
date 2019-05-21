/* 
* Nest and third party imports
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';

/* 
* custom imports
*/
import { userEntity } from './entity/user.entity';
import { LogService } from '../../service/logger.service';

/* 
* User Service
*/
@Injectable()
export class UsersService {

    MODULENAME = 'USERSERVICE';

    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>, private logger: LogService) { }

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

    /**
    * fetch all user list
    * @param {*} evUniqueID EV unique id
    */
    async getUserList(evUniqueID) {

        let taskName = 'getUserList';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: - `);

            const list = await this.userRepository.find();
            return list;

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
    * Get details of user
    * @param {*} evUniqueID EV unique id
    * @param {*} userid is a req params
    */
    async getUser(evUniqueID, userid) {
        let taskName = 'getUser';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);

            const details = await this.userRepository.findOne({ username: userid });
            return details;

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
    * Delete user
    * @param {*} evUniqueID EV unique id
    * @param {*} userid is a req data
    */
    async deleteUser(evUniqueID, userid) {

        let taskName = 'deleteUser';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);

            const user = await this.userRepository.delete({ username: userid });
            return user;

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
    * update user
    * @param {*} evUniqueID EV unique id
    * @param {*} data is a req data
    */
    async editPost(evUniqueID, data) {

        let taskName = 'editPost';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const editedPost = await this.userRepository.update({ username: data.username }, data);
            return editedPost;

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
    * registerUsers user
    * @param {*} evUniqueID EV unique id
    * @param {*} data is a req data
    */
    async registerUsers(evUniqueID, data): Promise<userEntity> {

        let taskName = 'registerUsers';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const savedata = await getManager().query(`INSERT INTO user_entity(username, email, mobile, password, address) VALUES ('${data.username}','${data.email}','${data.mobile}','${data.password}','${data.address}')`);
            return savedata;

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
      * registerUsers user
      * @param {*} evUniqueID EV unique id
      */
    async getUserData(evUniqueID) {

        let taskName = 'getUserData';

        try {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})`);

            const list = await getManager().query(`SELECT * FROM user_entity`);
            return list;

        } catch (error) {

            this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

}
