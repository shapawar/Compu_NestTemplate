/* 
* Nest & Third party imports
*/
import { Controller, Get, HttpCode, Req } from '@nestjs/common'; 

/* 
* Custome imports
*/
import { AppService } from '../app.service';
import { LogService } from '../middleware/logger.middleware';


/* 
* Ping route for helth check
*/
@Controller('ping')
export class PingController {

    taskName = "PingController";
    MODULENAME = "PINGCONTROLLER"
     logger = new LogService();
     appService = new AppService();
   
   

    @Get()
    @HttpCode(200)
    ping(@Req() req){
        
        this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${this.taskName}`);

        const task = {
            name:this.taskName,
            info:"Ping controller executed"
        }
    
        let pingdata= this.appService.endMetaData(req.evUniqueID,0,'Submitted Successfully',req.metadata,task);
        return pingdata;
    }

    @Get()
    sum() {
        return this.appService.getHello();
    }

}
