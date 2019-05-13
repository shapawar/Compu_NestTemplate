
/* 
* Nest & Third party imports
*/
import { Controller, Get, Res, Post, Param, Body, Req, HttpException } from '@nestjs/common';

/* 
* Custom Imports
*/
import { UserPostDTO } from '../users/user.post.dto';
import { LoginService } from './login.service';
import { LogService } from 'src/middleware/logger.middleware';

@Controller('login')
export class LoginController {
   
     constructor(private loginService:LoginService, private logger:LogService){}

     /* Render login page */
    @Get()
    async loginCheck(@Res() res){
    this.logger.debug("ok");  
     res.render('login',{title:"Welcome to comepumatrice",msg:null });

    }

    /* Check login credentials */
    @Post()
    async loginPost(@Res() res,@Req() req, @Body() UserPostDTO: UserPostDTO){
 
        const postData = await this.loginService.checkLogin(UserPostDTO);
        if(postData == undefined){
            const errors = {User: ' Invalid Credential try again'};
            throw new HttpException({errors}, 401);
           // res.render('login',{title:"Invalid Credential try again",msg:'user not found!!' });
        }else{
            const token = await this.loginService.generateJWT(postData);
            res.render('main',{title:"Welcome to compumatrice", msg:"User successfully login", jwtToken:token})
        }
       
    }
}
