import { Controller, Get, HttpCode, Req } from '@nestjs/common'; 7
import { apiResponse } from '../interfaces/metadata.interface'
import { LogService } from '../middleware/logger.middleware'

@Controller('ping')
export class PingController {

    taskName = "PingController";
    constructor(private logger: LogService) {

    }
    @Get()
    @HttpCode(200)
    ping(@Req() req): Promise<apiResponse[]> {

        this.logger.debug(`[${req.evUniqueID}](MODULENAME)`);
        this.logger.error("Hello");
        this.logger.info("Hello");
        this.logger.log("Hello");
        this.logger.warn("Hello");
        return req.metadata;
    }
}
