import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userEntity } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(userEntity) private readonly userRepository: Repository<userEntity>) { }
    MODULENAME = 'User Service';
     
    
    /**
     * create user
     * @param {*} evUniqueID req unique id
     * @param {*} data is a req data
     */
    async createUser(evUniqueID, data): Promise<userEntity> {
        let taskName = 'createUser';

        try {
            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const savedata = await this.userRepository.save(data);
            return savedata
        } catch (error) {

            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.stack}`);
            Logger.error(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.message}`);

            return error;
        }

    }

     /**
     * fetch all user list
     * @param {*} evUniqueID req unique id
     */
    async getUserList(evUniqueID) {
        let taskName = 'getUserList';

        try {
            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- QueryData: - `);

            const list = await this.userRepository.find();
            return list;
        } catch (error) {

            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.stack}`);
            Logger.error(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.message}`);

            return error;
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
            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- QueryData: ${userid}`);

            const details = await this.userRepository.findOne({ username: userid });
            return details;
        } catch (error) {

            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.stack}`);
            Logger.error(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.message}`);

            return error;
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
            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- QueryData: ${userid}`);

            const user = await this.userRepository.delete({ username: userid });
            return user;
        } catch (error) {

            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.stack}`);
            Logger.error(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.message}`);

            return error;
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
            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- QueryData: ${JSON.stringify(data)}`);

            const editedPost = await this.userRepository.update({ username: data.username }, data);
            return editedPost;
        } catch (error) {

            Logger.log(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.stack}`);
            Logger.error(`[${evUniqueID}] - ${this.MODULENAME}(${taskName})- ${error.message}`);

            return error;
        }

    }

}
