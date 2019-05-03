import { Controller, Post, Res, Body, HttpStatus, Get, Param, Delete, Put, Next, Logger, Req } from '@nestjs/common';
import { UserPostDTO } from './user.post.dto';
import { UsersService } from './users.service';




@Controller('users')
export class UsersController {
    
    constructor(private userService: UsersService) {
    }
    
    MODULENAME = 'User Controller';
   
     /**
     * create user
     */
    @Post()
    async addPost(@Req() req, @Res() res, @Body() userpostdto: UserPostDTO) {
            let taskName = 'Create User'
        try {
             Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const newPost = await this.userService.createUser(req.evUniqueID,userpostdto);
            return res.status(HttpStatus.OK).json({
                message: "Post has been submitted successfully!",
                post: newPost
            });

        } catch (error) {
            Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
            throw error;
        }

    }


     /**
     * fetch user list
     */
    @Get()
    async getUserList(@Req() req,@Res() res, ) {

        let taskName = 'Fect All User List'
        try {
            Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${"-"}`);
            const userlist = await this.userService.getUserList(req.evUniqueID);
            return res.status(HttpStatus.OK).json({
                message: "Fetch User List successfully",
                list: userlist
            });

        } catch (error) {
            Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);
            throw error;
        }
    }

     /**
     *get user Details using userid
     */
    @Get(':userID')
    async getUser(@Req() req,@Res() res, @Param('userID') userID) {
        let taskName = 'Get User Details'

        try {
            Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${ userID }`);

            const user = await this.userService.getUser(req.evUniqueID,userID);
            return res.status(HttpStatus.OK).json({ message: "Fetch user info successfully", UserDetails: user })
        } catch (error) {
            Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);

            throw error;
        }


    }

     /**
     * delete user using username
     */
    @Delete(':userID')
    async deleteUser(@Req() req, @Res() res, @Param('userID') userID) {
        let taskName = 'Delete User';

        try {
            Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${userID}`);

            const user = await this.userService.deleteUser(req.evUniqueID,userID);
            return res.status(HttpStatus.OK).json({ message: "User deleted successfully", data: user });
        } catch (error) {
            Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);

            throw error;
        }

    }

     /**
     * update user adress user
     */
    @Put()
    async updateUser(@Req() req, @Res() res, @Body() userPostDTO: UserPostDTO) {
            let taskName = 'Update User'

        try {
            Logger.log(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

            const editPost = await this.userService.editPost(req.evUniqueID,userPostDTO);
            return res.status(HttpStatus.OK).json({
                message: 'user has been updated successfully ',
                details: editPost
            })

        } catch (error) {
            Logger.error(`[${req.evUniqueID}] - ${this.MODULENAME} - ${taskName} - ErrorMessage: ${error.message}`);

            throw error;
        }

    }


}
