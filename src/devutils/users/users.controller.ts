/* 
* Nest & Third party imports
*/
import { Controller, Post, Res, Body, Get, Param, Delete, Put, Req } from '@nestjs/common';
import { ApiOperation, ApiImplicitParam, ApiBearerAuth, ApiExcludeEndpoint } from '@nestjs/swagger';
import { validate } from 'class-validator';

/* 
* Custom imports
*/
import { UserPostDTO } from './dto/user.post.dto';
import { UsersService } from './users.service';
import { userEntity } from './entity/user.entity';
import { AppService } from '../../service/app.service';
import { LogService } from '../../service/logger.service';


@Controller('users')
export class UsersController {

    MODULENAME = 'UsersController';

    constructor(private userService: UsersService, private Logger: LogService, private appService:AppService) { }

    /**
    * create user
    */
    @Post()
    @ApiOperation({ title: 'Create Users' })
    @ApiExcludeEndpoint()
    async addPost(@Req() req, @Res() res, @Body() userpostdto: UserPostDTO) {

        let taskName = 'Create User';
        const httpCode = 200; //default
        
        try {

            this.Logger.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            let userpost = new userEntity();

            userpost.username = userpostdto.username;
            userpost.email = userpostdto.email;
            userpost.mobile = userpostdto.mobile;
            userpost.password = userpostdto.password;
            userpost.address = userpostdto.address;

            let checkerror = await validate(userpost);

            if (checkerror.length > 0) {
                let value = checkerror.map(data => data.constraints.length || data.constraints.isEmail || data.constraints.isNotEmpty);
                throw new Error(value[0]);
            } 
            else {
                const task = {
                    name: taskName,
                    info: "Add user details",
                    elapsedTimeInMs: Date.now()
                }

                const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
                const newPost = await this.userService.createUser(req.evUniqueID, userpostdto);

                return res.status(httpCode).json({
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
    @ApiBearerAuth()
    @ApiExcludeEndpoint()
    @ApiOperation({ title: 'Fetch user details' })
    async getUserList(@Req() req, @Res() res, ) {
        
        let taskName = 'get user list';
        const httpCode = 200; //default

        try {

            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${"-"}`);
            
            const task = {
                name: taskName,
                info: "Get user list",
                elapsedTimeInMs: Date.now()
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch User List successfully', req.metadata, task);
            const userlist = await this.userService.getUserList(req.evUniqueID);
           
            if (userlist == undefined) {

                throw new Error(`Users are not found plz try again !!!`);
            }

            return res.status(httpCode).json({
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
    @Get(':userID')
    @ApiImplicitParam({ name: 'userID' })
    @ApiBearerAuth()
    @ApiExcludeEndpoint()
    @ApiOperation({ title: 'Fetch user details according to username' })
    async getUser(@Req() req, @Res() res, @Param('userID') userID) {
        
        let taskName = 'getUser';
        const httpCode = 200; //default

        try {

            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);

            const task = {
                name: taskName,
                info: "Get user list",
                elapsedTimeInMs: Date.now()
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch user info successfully', req.metadata, task);
            const user = await this.userService.getUser(req.evUniqueID, userID);

            if (user == undefined) {

                throw new Error(`Username is not found plz try again !!!`);
            }

            return res.status(httpCode).json({
                metadata: usermetadata,
                UserDetails: user,
            });

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
    @ApiImplicitParam({ name: 'userID' })
    @ApiOperation({ title: 'Delete user using username' })
    @ApiBearerAuth()
    @ApiExcludeEndpoint()
    async deleteUser(@Req() req, @Res() res, @Param('userID') userID) {

        let taskName = 'deleteUser';
        const httpCode = 200; //default

        try {

            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME}) - ${taskName} - QueryData: ${userID}`);
            
            const task = {
                name: taskName,
                info: "Delete user according to user id",
                elapsedTimeInMs: Date.now()
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'User deleted successfully', req.metadata, task);
            const user = await this.userService.deleteUser(req.evUniqueID, userID);

            if (user.affected == 0) {

                throw new Error(`Username is not found plz try again !!!`);
            }

            return res.status(httpCode).json({
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
    @ApiBearerAuth()
    @ApiExcludeEndpoint()
    @ApiOperation({ title: 'Update user details by username' })
    async updateUser(@Req() req, @Res() res, @Body() userPostDTO: UserPostDTO) {

        let taskName = 'updateUser';
        const httpCode = 200; //default

        try {

            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const task = {
                name: taskName,
                info: "Update the user details",
                elapsedTimeInMs: Date.now()
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'user has been updated successfully', req.metadata, task);
            const editPost = await this.userService.editPost(req.evUniqueID, userPostDTO);

            if (editPost == undefined) {

                throw new Error(`Username is not found plz try again !!!`);
            }

            return res.status(httpCode).json({
                metadata: usermetadata,
                details: editPost
            });

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
    @ApiOperation({ title: 'Create users' })
    @ApiExcludeEndpoint()
    async addPosts(@Res() res, @Req() req, @Body() userpostdto: UserPostDTO) {
       
        let taskName = "registerUser";
        const httpCode = 200; //default

        try {

            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const task = {
                name: taskName,
                info: "Add user details",
                elapsedTimeInMs: Date.now()
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
            const newPost = await this.userService.registerUsers(req.evUniqueID, userpostdto);
           
            return res.status(httpCode).json({
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
    @ApiBearerAuth()
    @ApiExcludeEndpoint()
    @ApiOperation({ title: 'Fetch user details' })
    async getUserLists(@Req() req, @Res() res) {
        
        let taskName = "getUserLists";
        const httpCode = 200; //default

        try {

            this.Logger.debug(`[${req.evUniqueID}](${this.MODULENAME} )- ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const task = {
                name: taskName,
                info: "Get user list",
                elapsedTimeInMs: Date.now()
            }

            const usermetadata = this.appService.endMetaData(req.evUniqueID, 0, 'Fetch User List successfully', req.metadata, task);
            const userlist = await this.userService.getUserData(req.evUniqueID);
           
            if (userlist == undefined) {

                throw new Error(`Users are not found plz try again !!!`);
            }
            
            return res.status(httpCode).json({
                metadata: usermetadata,
                list: userlist
            });

        } catch (error) {
            
            this.Logger.error(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.Logger.debug(`[${req.evUniqueID}]( ${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }
    }
}


