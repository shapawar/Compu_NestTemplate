
/* 
* Nest & Third party imports
*/
import { Injectable } from '@nestjs/common';
import * as moment from 'moment'

/* 
* Custom imports
*/
import { apiResponse } from './interfaces/metadata.interface';
import { LogService } from './middleware/logger.middleware';
import { ErrorcodesService } from './errorcodes/errorcodes.service';

@Injectable()
export class AppService {
  MODULENAME = "AppService";

  ///logger = new LogService();
  //errorService = new ErrorcodesService();

  constructor(private logger: LogService, private errorService: ErrorcodesService) { }
  //Add comments 
  endMetaData(evUniqueID, errCode, errMsg, metadata: apiResponse, task) {
    const taskName = "endMetaData method";

    try {
      const errorData = this.errorService.getErrorInformation(evUniqueID, errCode, errMsg);

      metadata.errCode = errorData.code;
      metadata.errMsg = errorData.message;
      metadata.elapsedTimeInMS = moment(Date.now()).diff(metadata.requestTS, 'milliseconds');
      metadata.tasks[metadata.tasks.push({
        name: task.name,
        info: task.info,
        startTS: moment().format(),
        elapsedTimeInMS: moment(Date.now()).diff(task.elapsedTimeInMs, 'milliseconds')
      }) - 1];

      return metadata

    } catch (error) {
      this.logger.error(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.message}`);
      this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${taskName}-${error.stack}`);

      throw error;
    }
  }
}
