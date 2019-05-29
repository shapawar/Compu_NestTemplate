/* 
* Nest & Third party imports
*/
import { Controller, Post, Req, Res } from '@nestjs/common';
import { validate } from 'class-validator';
/* 
* Custom imports
 */
import { LogService } from '../../service/logger.service';
import { AppService } from '../../service/app.service';
import { UserSignupDTO } from './dto/signup_dto';
import { signup } from './entity/signup_entity';
import { SignupService } from './signup.service';

@Controller('signup')
export class SignupController {
  MODULENAME = 'SignupController';

    constructor(private signupservice:SignupService, private logservice:LogService, private appservice:AppService ){

    }

    //create user registration
    @Post()
    async signUp(@Req() req, @Res() res, signUpDTO: UserSignupDTO){
        let taskName="signUp";
        const httpCode = 200;

        try {

          this.logservice.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - QueryData: ${JSON.stringify(req.body)}`);

          let userpost = new signup();

          userpost.fname = signUpDTO.fname;
          userpost.lname = signUpDTO.lname;
          userpost.username = signUpDTO.username;
          userpost.email = signUpDTO.email;
          userpost.mobile = signUpDTO.mobile;
          userpost.gender = signUpDTO.gender;

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

              const usermetadata = this.appservice.endMetaData(req.evUniqueID, 0, 'Post has been submitted successfully!', req.metadata, task);
              const newPost = await this.signupservice.createUser(req.evUniqueID, UserSignupDTO);

              return res.status(httpCode).json({
                  metadata: usermetadata,
                  post: newPost,
              });
          }

          
        } catch (error) {

          this.logservice.error(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
          this.logservice.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);
          
          throw error;
        }
        
    }
}
