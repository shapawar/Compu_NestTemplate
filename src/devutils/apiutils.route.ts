/* 
* Nest & Third party imports
*/
import { Get, Req, Res, Controller, Post } from "@nestjs/common";
import { Repository } from "typeorm";

/* 
*Custom imports
*/
import { LogService } from '../middleware/logger.middleware';
import { UsersService } from "./users/users.service";

//Module name
const MODULENAME = "ApiUtils";

@Controller('/apiutils/auth-token')
export class ApiUtils {

    //Create instance of service
    logger = new LogService();
    userService = new UsersService(new Repository);

    @Get()
    authToken(@Req() req, @Res() res) {

        let taskname = "Auth token get method";
        
        try {

            this.logger.debug(`[${req.evUniqueID}](${MODULENAME})-(${taskname})`);

            // data
            const curDate = new Date();
            const expDate = new Date();

            expDate.setSeconds(curDate.getSeconds() + 60);

            const data = {
                "evUniqueID": req.evUniqueID,
                "username": 'Safal@1234',
                "exp": expDate.getTime(),
                "iat": curDate.getTime(),
                "useJWT": '',
                "jwt": '',
                "errMsg": ''
            };

            res.render('auth-token', { data: data });

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${MODULENAME})-(${taskname})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${MODULENAME})-(${taskname})- ${error.message}`);

            throw error;
        }
    }

    @Post()
    async encodeJWT(@Req() req, @Res() res) {

        let taskName = "Auth token encode method";

        try {

            this.logger.debug(`[${req.evUniqueID}](${MODULENAME})-(${taskName})- QueryData: ${JSON.stringify(req.body)}`);

            const data = {
                "evUniqueID": req.evUniqueID,
                "username": req.body.username,
                "exp": req.body.exp,
                "iat": req.body.iat,
                "useJWT":'',
                "jwt": req.body.jwt,
                "errMsg": ''
            };


            let jwtPayload = {
                "userID": req.body.username,
                "exp": 0,
                "iat": 0,
            };

            // exp and iat - normalize them
            let exp = new Date(data.exp);
            let iat = new Date(data.iat);

            data.exp = exp.getTime();
            data.iat = iat.getTime();

            // exp and iat MUST be in seconds since EPOCH
            jwtPayload.exp = Math.floor(exp.getTime() / 1000);
            jwtPayload.iat = Math.floor(iat.getTime() / 1000);
            
            data.jwt = await this.userService.generateJWT(req.evUniqueID, jwtPayload);
            
            res.render('auth-token', { data: data })

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${MODULENAME})-(${taskName})- ${error.message}`);

            throw error;

        }
    }
}