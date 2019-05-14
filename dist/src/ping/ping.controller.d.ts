import { AppService } from '../app.service';
import { LogService } from '../middleware/logger.middleware';
export declare class PingController {
    private logger;
    private readonly appService;
    taskName: string;
    MODULENAME: string;
    constructor(logger: LogService, appService: AppService);
    ping(req: any): Promise<import("../interfaces/metadata.interface").apiResponse>;
}
