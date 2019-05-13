/* 
* Nest & Third party imports
*/
import { Controller, Get, HttpCode, Req } from '@nestjs/common'; 

/* 
* Custome imports
*/
import { AppService } from 'src/app.service';
import { LogService } from 'src/middleware/logger.middleware';

/* 
* Ping route for helth check
*/
@Controller('ping')
export class PingController {
    taskName = "PingController";
    MODULENAME = "PINGCONTROLLER"

    constructor( private logger:LogService ,private readonly appService: AppService) {
    }
    
    @Get()
    @HttpCode(200)
    ping(@Req() req){
        this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${this.taskName}`);
        let pingdata= this.appService.endMetaData(req.evUniqueID,0,'Submitted Successfully',req.metadata);
        let elapsedTS = this.appService.endTask(Date.now());
        console.log("===",elapsedTS);
        return pingdata;
    }
}
