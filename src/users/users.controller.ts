import { Controller, Post, Res, Body, HttpStatus, Get, Param, Delete,Put } from '@nestjs/common';
import { UserPostDTO } from '../devutils/users/user.post.dto';
import { UsersService } from './users.service';




@Controller('users')
export class UsersController {
   constructor(private userService: UsersService){

   }
     
     @Post()
    async addPost(@Res() res, @Body() userpostdto: UserPostDTO) {

        const newPost = await this.userService.createUser(userpostdto);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    } 

    @Post('/noorm')
    async addPosts(@Res() res, @Body() userpostdto: UserPostDTO) {

        const newPost = await this.userService.createUsers(userpostdto);
        return res.status(HttpStatus.OK).json({
            message: "Post has been submitted successfully!",
            post: newPost
        })
    } 

    @Get('/noorm')
    async getUserLists(@Res() res,){
       const userlist = await this.userService.getUserData();
       return res.status(HttpStatus.OK).json({
           message:"Fetch User List successfully",
           list:userlist
       })
    }



    @Get()
    async getUserList(@Res() res,){
       const userlist = await this.userService.getUserList();
       return res.status(HttpStatus.OK).json({
           message:"Fetch User List successfully",
           list:userlist
       })
    }

     @Get(':userID')
    async getUser(@Res() res, @Param('userID') userID){
        const user = await this.userService.getUser(userID);
        return res.status(HttpStatus.OK).json({message:"Fetch user info successfully",UserDetails:user})
       
    }

    @Delete(':userID')
    async deleteUser(@Res() res, @Param('userID') userID){
          const user = await this.userService.deleteUser(userID);
          return res.status(HttpStatus.OK).json({message:"User deleted successfully", data:user}); 
    }

    @Put()
    async updateUser(@Res() res, @Body() userPostDTO: UserPostDTO){
   
        const editPost = await this.userService.editPost(userPostDTO);
        return res.status(HttpStatus.OK).json({
            message:'user has been updated successfully ',
            details:editPost
        })
    }
    
    
    

   
}
