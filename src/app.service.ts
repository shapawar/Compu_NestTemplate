import * as moment from 'moment'
/* 
* Nest & Third party imports
*/
import { Injectable } from '@nestjs/common';
import { Request, Response, NextFunction, Router, response } from "express";
import { apiResponse } from './interfaces/metadata.interface';
// import { LogService } from './middleware/logger.middleware';


@Injectable()
export class AppService {

  taskName = "AppService";
  MODULENAME = "AppService"

  // constructor(private logger: LogService) { }
  getHello(): string {
    return 'Hello World!';
  }

  endMetaData(evUniqueID, errCode, errMsg, metadata: apiResponse) {
    console.log("===", metadata.elapsedTimeInMS);
    try {
      let safaldata = {

      }
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
      // this.logger.debug(`[${evUniqueID}](${this.MODULENAME})-${this.taskName}`);
      throw error;
    }


  }

  // createTask(name, info) {
  //   const taskArray: tasksData[] = [];
  //   taskArray.push();
  //   return taskArray;
  // }

}
