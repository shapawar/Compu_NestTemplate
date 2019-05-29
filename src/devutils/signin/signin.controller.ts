/* 
* Nest & Third party imports
*/
import { Controller, Post, Req, Body, HttpException, Res } from '@nestjs/common';

/* 
* Custom imports
*/
import { UserSignupDTO } from '../signup/dto/signup.dto';
import { SigninService } from './signin.service';
import { LogService } from '../../service/logger.service';

@Controller('signin')
export class SigninController {

    MODULENAME = 'SigninController';

    constructor(private loginService: SigninService, private logService: LogService) {

    }

    /* 
    * Login check
    */
    @Post()
    async loginCheck(@Req() req, @Res() res, @Body() signupDTO: UserSignupDTO) {
        let taskName = 'loginCheck';
        const httpCode = 200; //default

        try {

            this.logService.debug(`[${req.evUniqueID}]- ${this.MODULENAME}-${taskName}-body params ${JSON.stringify(req.body)}`);

            const postData = await this.loginService.checkLogin(req.evUniqueID,signupDTO);
            if (postData == undefined) {

                const errors = { User: ' Invalid Credential try again' };
                throw new HttpException({ errors }, 401);

            } else {

                const token = await this.loginService.generateJWT(req.evUniqueID,postData);
                res.status(httpCode).json({ title: "Welcome to compumatrice", msg: "User successfully login", jwtToken: token })
            }

        } catch (error) {

            this.logService.error(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.message}`);
            this.logService.debug(`[${req.evUniqueID}] (${this.MODULENAME}) - ${taskName} - ErrorMessage: ${error.stack}`);

            throw error;
        }
    }

}
