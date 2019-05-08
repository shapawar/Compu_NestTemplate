import { Controller, Get, HttpCode, Req } from '@nestjs/common'; 7
import { apiResponse } from '../interfaces/metadata.interface'
import { LogService } from '../middleware/logger.middleware'

@Controller('ping')
export class PingController {

    taskName = "PingController";
    MODULENAME = "PINGCONTROLLER"
    constructor(private logger: LogService) {

    }
    @Get()
    @HttpCode(200)
    ping(@Req() req): Promise<apiResponse[]> {
        req.metadata.elapsedTimeInMS = 125;
        this.logger.debug(`[${req.evUniqueID}](${this.MODULENAME})-${this.taskName}`);
        return req.metadata;
    }
}
