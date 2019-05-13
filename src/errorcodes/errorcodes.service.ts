/* 
* Nest & Third party imports
 */
import { Injectable, } from '@nestjs/common';

/* 
* custom imports
*/
import { GeneralCodes } from './general.errocodes.config';
import { errorCodes } from 'src/interfaces/errorcode.interface';
import { LogService } from 'src/middleware/logger.middleware';




@Injectable()
export class ErrorcodesService {

    taskName = "ErrorCodesService";
    MODULENAME = "ErrorCodesController"
    
    constructor(private readonly generalcodes: GeneralCodes) { }

    getErrorInformation(evUniqueID, errCode, errMsg): errorCodes {

        let logger = new LogService();

        try {
            let errorData = this.generalcodes.ErrorCodes

            // convert to int just in case errCode is not
            const eCode = parseInt(errCode);

            // get error info
            const filtered = errorData.filter((item) => {
                return (item.code === eCode);
            });

            if (filtered.length > 0) {

                const filteredItem = filtered[0];

                if (filteredItem.canOverrideMessage) {
                    errMsg = errMsg || filteredItem.message;

                    if (errMsg === '') {
                        errMsg = filteredItem.message;
                    }

                } else {

                    // use default message
                    errMsg = filteredItem.message;
                }

                const errInfo = filteredItem;
                errInfo.message = errMsg;
                return errInfo;

            } else {

                throw new Error(`Unknown error code: ${errCode}`);

            }

        } catch (error) {

            logger.debug(`[${evUniqueID}] ${this.MODULENAME}(${this.taskName}): ${error.message}`);
            logger.error(`[${evUniqueID}] ${this.MODULENAME}(${this.taskName}): ${error.message}`);

            return { "code": 1, "message": 'Internal Error', "description": error.message, "type": 'ERROR', "canOverrideMessage": false };
        }
    }

}
