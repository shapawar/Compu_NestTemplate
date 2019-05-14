import { GeneralCodes } from './general.errocodes.config';
import { errorCodes } from '../interfaces/errorcode.interface';
export declare class ErrorcodesService {
    private readonly generalcodes;
    taskName: string;
    MODULENAME: string;
    constructor(generalcodes: GeneralCodes);
    getErrorInformation(evUniqueID: any, errCode: any, errMsg: any): errorCodes;
}
