/* 
* Nest & Third party imports
*/
import { Controller, Get, HttpCode, Req, Res, UseFilters } from '@nestjs/common';

/* 
* Custome imports
*/
import { AppService } from '../app.service';
import { LogService } from '../middleware/logger.middleware';
import { ErrorFilter } from '../middleware/errorhandler.middleware';



/* 
* Ping route for helth check
*/
@Controller('ping')
//@UseFilters(new ErrorFilter())
export class PingController {
    MODULENAME = "PingController";

    constructor(private logger: LogService, private appService: AppService) { }

    //logger = new LogService();
    //appService = new AppService();


    @Get()
    ping(@Req() req, @Res() res) {
        const taskName = "/ping";
        const httpCode = 200; //default

        try {

            this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${taskName}`);
            throw new Error('Error in ping controller')

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
