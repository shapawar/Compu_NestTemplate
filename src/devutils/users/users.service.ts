/* 
* Nest and third party imports
*/
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import * as crypt from 'crypto'
const jwt = require('jsonwebtoken');

/* 
* custom imports
*/
import { userEntity } from './user.entity';
import { LogService } from '../../service/logger.service';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) { }
    MODULENAME = 'USERSERVICE';

    Logger = new LogService();
    /**
     * create user
     * @param {*} evUniqueID EV unique id
     * @param {*} data is a req data
     */
    async createUser(evUniqueID, data) {
        let taskName = 'createUser';

        try {
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const checkuser = await this.userRepository.findOne({ username: data.username });
            if (checkuser == undefined) {

                const savedata = await this.userRepository.save(data);
                return savedata

            } else {

                throw new Error(`Username is already present plz try another !!!`);
            }

        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

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
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: - `);

            const list = await this.userRepository.find();
            return list;
        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

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
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);

            const details = await this.userRepository.findOne({ username: userid });
            return details;
        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

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
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);

            const user = await this.userRepository.delete({ username: userid });
            return user;

        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

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
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const editedPost = await this.userRepository.update({ username: data.username }, data);
            return editedPost;
        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

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
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const savedata = await getManager().query(`INSERT INTO user_entity(username, email, mobile, password, address) VALUES ('${data.username}','${data.email}','${data.mobile}','${data.password}','${data.address}')`);
            return savedata;
        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

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
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: - `);

            const list = await getManager().query(`SELECT * FROM user_entity`);
            return list;

        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }

    }

    /**
   * Genarate JWT Token
   * @param {*} evUniqueID EV unique id
   * @param {*} data is user payload
   */
    async generateJWT(evUniqueID, data) {
        let taskName = 'generateJWT';

        try {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);

            let jwtHeader = {
                "alg": "HS256",
                "typ": "JWT"
            };

            return jwt.sign(data, process.env.JWTSECRET, { algorithm: 'HS256', header: jwtHeader });

        } catch (error) {

            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }
    }

    /**
 * Manually generate JWT
 * @param {String} evUniqueID EV unique ID
 * @param {JSON} payload JWT payload
 */
    generateJWTManual(evUniqueID, payload) {

        const taskName = 'generateJWTManual';

        try {
            this.Logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${JSON.stringify(payload)}`);

            let header = {
                "alg": "HS256",
                "typ": "JWT"
            };
            
            // base64urlencode
            const hdrEncoded = this.cleanUpJWTManual(evUniqueID, Buffer.from(JSON.stringify(header)).toString('base64'));

            // const payEncoded = encodeURI(Buffer.from(payload).toString('base64'));
            const payEncoded = this.cleanUpJWTManual(evUniqueID, Buffer.from(JSON.stringify(payload)).toString('base64'));

            const combined = hdrEncoded + '.' + payEncoded;

            // hash
            const origSig = crypt.createHmac('sha256', process.env.JWTSECRET).update(combined).digest('base64');
            const jwtSig = this.cleanUpJWTManual(evUniqueID, origSig);

            return `${combined}.${jwtSig}`;
        } catch (error) {

            this.Logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.message}`);
            this.Logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${error.stack}`);

            throw error;
        }
    }

    /**
     * Clean up invalid Base64 chars to be used in JWT (for JWT generated manually)
     * @param {String} evUniqueID EV unique ID
     * @param {string} val Base64 JWT to clean up
     */
    cleanUpJWTManual(evUniqueID, val) {
        const taskName = 'cleanUpJWT';

        try {
            this.Logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${val}`);

            val = val.replace(/\+/gi, '-');
            val = val.replace(/\//gi, '_');
            val = val.split('=')[0];

            return val;
        } catch (e) {
            this.Logger.error(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.message}`);
            this.Logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${taskName}): ${e.stack}`);

            throw e;
        }
    }


}
