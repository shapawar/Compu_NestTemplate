/* 
* Nest & Third party imports
*/
import { Controller, Get, Req, Res } from '@nestjs/common';

/* 
* Custome imports
*/
import { AppService } from '../service/app.service';
import { LogService } from '../service/logger.service';

/* 
* Ping route for health check
*/
@Controller('ping')
export class PingController {
   
    MODULENAME = "PingController";

    constructor(private logger: LogService, private appService: AppService) { }

   //Ping route
    @Get()
    ping(@Req() req, @Res() res) {

        const taskName = "/ping";
        const httpCode = 200; //default

        try {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${taskName}`);

            const task = {
                name: taskName,
                info: "Ping controller executed",
                elapsedTimeInMs: Date.now()
            }

            let pingdata = this.appService.endMetaData(req.evUniqueID, 0, "Executed Successfully", req.metadata, task);

            return res.status(httpCode).send(pingdata);

        } catch (error) {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.stack}`);
            this.logger.error(`[${req.evUniqueID}](${this.MODULENAME})-(${taskName})- ${error.message}`);

            throw error;

        }

    }

}
