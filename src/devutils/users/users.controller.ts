
/* 
* Nest & Third party imports
*/
import { Controller, Post, Res, Body, HttpStatus, Get, Param, Delete, Put, Req } from '@nestjs/common';

/* 
* Custome imports
*/
import { UserPostDTO } from './user.post.dto';
import { UsersService } from './users.service';
import { LogService } from 'src/middleware/logger.middleware';

import { userEntity } from './user.entity';
import { validate } from 'class-validator';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService, private Logger: LogService) {
    }

    MODULENAME = 'USERCONTROLLER';

    /**
    * create user
    */
    @Post()
    async addPost(@Req() req, @Res() res, @Body() userpostdto: UserPostDTO) {
        let taskName = 'createUser'
        try {
            let userpost = new userEntity();

            this.Logger.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            userpost.username = userpostdto.username;
            userpost.email = userpostdto.email;
            userpost.mobile = userpostdto.mobile;
            userpost.password = userpostdto.password;
            userpost.address = userpostdto.address;

            let checkerror = await validate(userpost);

            if (checkerror.length > 0) {
                let value = checkerror.map(data => data.constraints.length ||data.constraints.isEmail||data.constraints.isNotEmpty );
                throw new Error(value[0]);
            } else {
                const newPost = await this.userService.createUser(req.evUniqueID, userpostdto);

                return res.status(HttpStatus.OK).json({
                    message: "Post has been submitted successfully!",
                    post: newPost
                });
            }
        } catch (error) {

            this.Logger.error(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }


    /**
    * fetch user list
    */
    @Get()
    async getUserList(@Req() req, @Res() res, ) {
        //throw new Error('Hello');
        let taskName = 'userList'
        try {
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${"-"}`);
            const userlist = await this.userService.getUserList(req.evUniqueID);
            return res.status(HttpStatus.OK).json({
                message: "Fetch User List successfully",
                list: userlist
            });

        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }
    }

    /**
    *get user Details using userid
    */
    @Get('/unique/:userID')
    async getUser(@Req() req, @Res() res, @Param('userID') userID) {
        let taskName = 'getUser';

        try {
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);

            const user = await this.userService.getUser(req.evUniqueID, userID);
            return res.status(HttpStatus.OK).json({ message: "Fetch user info successfully", UserDetails: user })
        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }


    }

    /**
    * delete user using username
    */
    @Delete(':userID')
    async deleteUser(@Req() req, @Res() res, @Param('userID') userID) {
        let taskName = 'deleteUser';

        try {
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);

            const user = await this.userService.deleteUser(req.evUniqueID, userID);
            return res.status(HttpStatus.OK).json({ message: "User deleted successfully", data: user });
        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }

    /**
    * update user adress user
    */
    @Put()
    async updateUser(@Req() req, @Res() res, @Body() userPostDTO: UserPostDTO) {
        let taskName = 'updateUser'

        try {
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const editPost = await this.userService.editPost(req.evUniqueID, userPostDTO);
            return res.status(HttpStatus.OK).json({
                message: 'user has been updated successfully ',
                details: editPost
            })

        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }

    /* 
    * create user using without TypeOrm(manually)
    */
    @Post('/noorm')
    async addPosts(@Res() res, @Req() req, @Body() userpostdto: UserPostDTO) {
        let taskName = "registerUser";

        try {
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const newPost = await this.userService.registerUsers(req.evUniqueID, userpostdto);
            return res.status(HttpStatus.OK).json({
                message: "Post has been submitted successfully!",
                post: newPost
            });

        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }

    /* 
    * Get user list
    */
    @Get('/noorm')
    async getUserLists(@Req() req, @Res() res) {
        let taskName = "getUserLists";

        try {
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const userlist = await this.userService.getUserData(req.evUniqueID);
            return res.status(HttpStatus.OK).json({
                message: "Fetch User List successfully",
                list: userlist
            })

        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }


}
