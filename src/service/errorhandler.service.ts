/* 
* Nset and third party imports
*/
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus, Injectable } from '@nestjs/common';

/* 
* Custom imports
*/

import { AppService } from './app.service';
import { LogService } from 'src/service/logger.service';


/* 
* Error Handler middleware
* Handle error thrown from anywhere from app
*/
@Catch()
@Injectable()
export class ErrorFilter implements ExceptionFilter {
  MODULENAME = "ERRORHANDLER";
  taskName = "Error_Handler";
  response;
  request;

  //create instance
  constructor(private logger: LogService, private appService: AppService) { }

  async catch(error: Error, host: ArgumentsHost) {

    let debugName = 'Error-Middleware';

    try {

      console.log("this.request");
      console.log("this.response");
      //create object/instance of different service
      this.response = host.switchToHttp().getResponse();
      this.request = host.switchToHttp().getRequest();

      console.log("this.request", this.request.evUniqueID);
      console.log("this.response", this.response.locals.evUniqueID);
      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);

      let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

      if (this.request.url == "/favicon.ico") {

        this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
        this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);
        return;

      }

      this.request.metadata.errMsg = error.message;
      this.request.metadata.errCode = 1;
      this.request.timestamp = new Date().toISOString();
      this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);

      const task = {
        name: this.taskName,
        info: error.stack
      }

      let responseobj = await this.appService.endMetaData(this.request.evUniqueID, this.request.metadata.errCode, error.message, this.request.metadata, task);
      return this.response.status(status).json(responseobj);

    } catch (error) {

      this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);

      throw error;

    }

  }

}