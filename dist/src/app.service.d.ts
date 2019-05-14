import { apiResponse } from './interfaces/metadata.interface';
import { LogService } from './middleware/logger.middleware';
import { ErrorcodesService } from './errorcodes/errorcodes.service';
export declare class AppService {
    private logger;
    private errorService;
    taskName: string;
    MODULENAME: string;
    constructor(logger: LogService, errorService: ErrorcodesService);
    getHello(): Promise<string>;
    endMetaData(evUniqueID: any, errCode: any, errMsg: any, metadata: apiResponse, task: any): Promise<apiResponse>;
    endTask(startTS: any): number;
}
