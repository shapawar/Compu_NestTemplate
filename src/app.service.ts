
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

  taskName = "AppService";
  MODULENAME = "AppService"

  /* Reasponse end metadata OBJ */
  endMetaData(evUniqueID, errCode, errMsg, metadata: apiResponse, task) {

    let logger = new LogService();
    let errorService = new ErrorcodesService();

    try {
      const errorData = errorService.getErrorInformation(evUniqueID, errCode, errMsg);

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

      logger.error(`[${evUniqueID}](${this.MODULENAME})-${this.taskName}`);
      logger.debug(`[${evUniqueID}](${this.MODULENAME})-${this.taskName}`);
      throw error;
    }
  }

  /**
   * end task
   * @param startTSInMs start time stamp in ms
   */
  endTask(startTSInMs) {

    return moment(Date.now()).diff(startTSInMs, 'milliseconds');

  }

}
