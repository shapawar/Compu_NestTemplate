/* 
* Nest & Third party imports
*/
import { Controller, Get, HttpCode, Req } from '@nestjs/common'; 

/* 
* Custome imports
*/
import { apiResponse } from '../interfaces/metadata.interface'
import { LogService } from '../middleware/logger.middleware'
import { AppService } from 'src/app.service';

/* 
* Ping route for helth check
*/
@Controller('ping')
export class PingController {

    taskName = "PingController";
    MODULENAME = "PINGCONTROLLER"
    constructor( private readonly appService: AppService) {

    }
    
    @Get()
    @HttpCode(200)
    ping(@Req() req){
        // req.metadata.elapsedTimeInMS = 125;
        // this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${this.taskName}`);
        return this.appService.endMetaData(req.evUniqueID,0,'Submitted Successfully',req.metadata);
    }
}
