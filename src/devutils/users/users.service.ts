/* 
* Nest and third party imports
*/
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getManager } from 'typeorm';
import {validate} from "class-validator";

/* 
* custom imports
*/
import { userEntity } from './user.entity';
import { LogService } from 'src/middleware/logger.middleware';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>, private Logger:LogService) { }
    MODULENAME = 'USERSERVICE';
     
    
    /**
     * create user
     * @param {*} evUniqueID req unique id
     * @param {*} data is a req data
     */
    async createUser(evUniqueID, data) {
        let taskName = 'createUser';
       

        try {
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(data)}`);
           let userpost = new userEntity();
           userpost.username = data.username;
           userpost.email = data.email;
           userpost.mobile= data.mobile;
           userpost.password= data.password;
           userpost.address = data.address;

           let checkerror = await validate(userpost);

           if (checkerror.length > 0) {
             let value = checkerror.map( data=> data.constraints.length);
            throw new Error(value[0]); 
        } else {

            const checkuser = await this.userRepository.findOne({username:data.username});
            if(checkuser == undefined){

                const savedata = await this.userRepository.save(userpost);
                return savedata

            }else{
                throw new Error(`Username is already present plz try another !!!`); 
            }
        }
         
        } catch (error) {
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }

    }

     /**
     * fetch all user list
     * @param {*} evUniqueID req unique id
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
     * @param {*} evUniqueID req unique id
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
     * @param {*} evUniqueID req unique id
     * @param {*} userid is a req data
     */
    async deleteUser(evUniqueID, userid) {
        let taskName = 'deleteUser';

        try {
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: ${userid}`);

            const user = await this.userRepository.delete({username:userid} );
            return user;
        } catch (error) {
 
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;
        }

    }

     /**
     * update user
     * @param {*} evUniqueID req unique id
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
     * @param {*} evUniqueID req unique id
     * @param {*} data is a req data
     */
     async registerUsers(evUniqueID,data): Promise<userEntity>{
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
     * @param {*} evUniqueID req unique id
     */
    async getUserData(evUniqueID){
        let taskName = 'getUserData';

        try {
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- QueryData: - `);

            const list = await  getManager().query(`SELECT * FROM user_entity`);
            return list;
            
        } catch (error) {
            this.Logger.debug(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.Logger.error(`[${evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;   
        }
       
    }


}
