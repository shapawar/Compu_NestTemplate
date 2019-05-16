
/* 
* Nest & Third party imports
*/
import { Controller, Post, Res, Body, HttpStatus, Get, Param, Delete, Put, Req, HttpException } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiImplicitParam } from '@nestjs/swagger';
import { validate } from 'class-validator';
/* 
* Custome imports
*/
import { UserPostDTO } from './user.post.dto';
import { UsersService } from './users.service';
import { LogService } from '../../middleware/logger.middleware';
import { userEntity } from './user.entity';
import { AppService } from '../../app.service';
import { Repository } from 'typeorm';


@ApiUseTags('users')
// @ApiBearerAuth()
@Controller('users')
export class UsersController {

    MODULENAME = 'USERCONTROLLER';
    constructor(private userService: UsersService) { }
    //userService = new UsersService(new Repository);
    Logger = new LogService();
    appService = new AppService()

    /**
    * create user
    */
    @Post()
    @ApiOperation({ title: 'Create Users' })
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
                let value = checkerror.map(data => data.constraints.length || data.constraints.isEmail || data.constraints.isNotEmpty);
                throw new Error(value[0]);
            } else {
                const task = {
                    name: taskName,
                    info: "Add user details"
                }

                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
                const newPost = await this.userService.createUser(req.evUniqueID, userpostdto);

                return res.status(HttpStatus.OK).json({
                    metadata: usermetadata,
                    post: newPost,
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
            const task = {
                name: taskName,
                info: "Get user list"
            }
            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch User List successfully', req.metadata, task);
            const userlist = await this.userService.getUserList(req.evUniqueID);
            return res.status(HttpStatus.OK).json({
                metadata: usermetadata,
                list: userlist,
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
    @ApiImplicitParam({ name: 'userID' })
    @Get(':userID')
    async getUser(@Req() req, @Res() res, @Param('userID') userID) {
        let taskName = 'getUser';

        try {
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);

            const task = {
                name: taskName,
                info: "Get user list"
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch user info successfully', req.metadata, task);
            const user = await this.userService.getUser(req.evUniqueID, userID);
            return res.status(HttpStatus.OK).json({
                metadata: usermetadata,
                UserDetails: user,
            })
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
            const task = {
                name: taskName,
                info: "Delete user according to user id"
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'User deleted successfully', req.metadata, task);
            const user = await this.userService.deleteUser(req.evUniqueID, userID);
            return res.status(HttpStatus.OK).json({
                metadata: usermetadata,
                data: user
            });
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

            const task = {
                name: taskName,
                info: "Update the user details"
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'user has been updated successfully', req.metadata, task);
            const editPost = await this.userService.editPost(req.evUniqueID, userPostDTO);
            return res.status(HttpStatus.OK).json({
                metadata: usermetadata,
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

            const task = {
                name: taskName,
                info: "Add user details"
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
            const newPost = await this.userService.registerUsers(req.evUniqueID, userpostdto);
            return res.status(HttpStatus.OK).json({
                metadata: usermetadata,
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
    @Get('/noorm/getlist')
    async getUserLists(@Req() req, @Res() res) {
        let taskName = "getUserLists";

        try {
            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const task = {
                name: taskName,
                info: "Get user list"
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch User List successfully', req.metadata, task);
            const userlist = await this.userService.getUserData(req.evUniqueID);
            return res.status(HttpStatus.OK).json({
                metadata: usermetadata,
                list: userlist
            })

        } catch (error) {
            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }

    }

    /* 
    * Login check post and jwt creation
    */
    @Post('/login')
    async loginPost(@Req() req, @Res() res, @Body() UserPostDTO: UserPostDTO) {

        let taskName = "loginPost";

        try {

            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const postData = await this.userService.checkLogin(req.evUniqueID, UserPostDTO);

            if (postData == undefined) {
                const errors = { User: ' Invalid Credential try again' };
                throw new HttpException({ errors }, 401);

            } else {

                const task = {
                    name: taskName,
                    info: "Check login post and create JWT token"
                }
                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'User login successfully', req.metadata, task);

                const token = await this.userService.generateJWT(req.evUniqueID,postData);

                return res.status(HttpStatus.OK).json({
                    metadata: usermetadata,
                    jwtToken: token
                });

            }
        } catch (error) {

            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;

        }
    }
}


