import { Controller, Post, Res, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { UserPostDTO } from './user.post.dto';
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


    @Get()
    async getUserList(@Res() res,){
       const userlist = await this.userService.getUserList();
       return res.status(HttpStatus.OK).json({
           message:"Fetch User List successfully",
           list:userlist
       })
    }

    /* @Get(':userid')
    async getUser(@Res() res, @Param('userID') userID){
        const user = await this.userService.getUser();
        return res.status(HttpStatus.OK).json({message:"Fetch user info successfully",UserDetails:user})
       
    }
 */

   
}
