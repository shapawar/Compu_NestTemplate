/* 
* Nset and third party imports
*/
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

/* 
* Custom imports
*/
import { LogService } from './logger.middleware';
import { AppService } from '../app.service';



/* 
* Error Handler middleware
* Handle all catch error throw by try block
*/

@Catch()
export class ErrorFilter implements ExceptionFilter {

  MODULENAME = "ERRORHANDLER";
  taskName = "Error_Handler";

  //create instance of service files
   logger = new LogService();
   appservice = new AppService();

  /* 
*Configure error Handler middleware
*/


  async catch(error: Error, host: ArgumentsHost) {

    let debugName = 'Error-Middleware';

    //create object/instance of different service
    let response = host.switchToHttp().getResponse();
    let request = host.switchToHttp().getRequest();

    try {

      this.logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);

      let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
 
      if (request.url == "/favicon.ico") {
  
        this.logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
        this.logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);
        return;
  
      }
  
      request.metadata.errMsg = error.message;
      request.metadata.errCode = 1;
      request.timestamp = new Date().toISOString();
      this.logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
      this.logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);
  
      const task = {
        name: this.taskName,
        info: error.stack
      }

      let responseobj = await this.appservice.endMetaData(request.evUniqueID, request.metadata.errCode, error.message, request.metadata, task);
      return response.status(status).json(responseobj);
  
    }catch (error) {

      this.logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
      this.logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);
 
    }

  }

}