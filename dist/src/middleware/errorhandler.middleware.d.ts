import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { AppService } from '../app.service';
export declare class ErrorFilter implements ExceptionFilter {
    private appService;
    MODULENAME: string;
    constructor(appService: AppService);
    catch(error: Error, host: ArgumentsHost): Promise<any>;
    myFunction(evUniqueID: any, errCode: any, errMsg: any, metadata: any, task: any): Promise<string>;
}
