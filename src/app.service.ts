import * as moment from 'moment'
/* 
* Nest & Third party imports
*/
import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { apiResponse } from './interfaces/metadata.interface';
import { LogService } from './middleware/logger.middleware';
// import { ErrorcodesService } from './errorcodes/errorcodes.service'

@Injectable()
export class AppService {

  taskName = "AppService";
  MODULENAME = "AppService"

  constructor(private logger: LogService) { }
  getHello(): string {
    return 'Hello World!';
  }

  
  endMetaData(evUniqueID, errCode, errMsg, metadata: apiResponse) {
    console.log("===", metadata.elapsedTimeInMS);
    try {
      // this.errorService.getErrorInformation(evUniqueID, errCode, errMsg);
      metadata.errCode = errCode;
      metadata.errMsg = errMsg;
      metadata.elapsedTimeInMS = moment(Date.now()).diff(metadata.requestTS, 'milliseconds');
      metadata.tasks[metadata.tasks.push({
        name: 'safal',
        info: 'ping',
        startTS:Date.now(),
        elapsedTimeInMS:-1
      }) - 1];
      return metadata
    } catch (error) {
      this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${this.taskName}`);
      throw error;
    }
  }
  endTask(startTS) {
    return moment(Date.now()).diff(startTS, 'milliseconds');
  }

}
