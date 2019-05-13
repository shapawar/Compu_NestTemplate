import * as moment from 'moment'
/* 
* Nest & Third party imports
*/
import { Injectable } from '@nestjs/common';
import { apiResponse } from './interfaces/metadata.interface';
import { LogService } from './middleware/logger.middleware';
import { ErrorcodesService } from './errorcodes/errorcodes.service';

@Injectable()
export class AppService {

  taskName = "AppService";
  MODULENAME = "AppService"

  constructor(private logger: LogService, private errorService: ErrorcodesService) { }
  getHello(): string {
    return 'Hello World!';
  }

  endMetaData(evUniqueID, errCode, errMsg, metadata: apiResponse, task) {
    try {
      const errorData = this.errorService.getErrorInformation(evUniqueID, errCode, errMsg);
     
      metadata.errCode = errorData.code;
      metadata.errMsg = errorData.message
      metadata.elapsedTimeInMS = moment(Date.now()).diff(metadata.requestTS, 'milliseconds');
      metadata.tasks[metadata.tasks.push({
        name: task.name,
        info: task.info,
        startTS: Date.now(),
        elapsedTimeInMS: this.endTask(Date.now())
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
