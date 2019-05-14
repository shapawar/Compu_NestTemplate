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
  taskName = "Error_Handler"
  /* 
*Configure error Handler middleware
*/


  async catch(error: Error, host: ArgumentsHost) {
    let debugName = 'Error-Middleware';

    //create object/instance of different service
    let logger = new LogService();
    let appservice = new AppService();


    let response = host.switchToHttp().getResponse();
    let request = host.switchToHttp().getRequest();
    let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if (request.url == "/favicon.ico") {

      logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);
      logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);
      return;

    }

    request.metadata.errMsg = error.message;
    request.metadata.errCode = 1;
    request.timestamp = new Date().toISOString();
    logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
    logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);

    const task = {
      name: this.taskName,
      info: error.stack
    }
    let responseobj = await appservice.endMetaData(request.evUniqueID, request.metadata.errCode, error.message, request.metadata, task);
    return response.status(status).json(responseobj);

  }

}