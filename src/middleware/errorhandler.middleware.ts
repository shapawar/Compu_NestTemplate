/* 
* Nset and third party imports
*/
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

/* 
* Custom imports
*/
import { LogService } from './logger.middleware';


/* 
* Error Handler middleware
* Handle all catch error throw by try block
*/
@Catch()
export class ErrorFilter implements ExceptionFilter {
 
  MODULENAME ="ERRORHANDLER";
  /* 
*Configure error Handler middleware
*/
 

   catch(error: Error, host: ArgumentsHost) {
    let debugName='Error-Middleware';
    let logger = new LogService();

    let response = host.switchToHttp().getResponse();
    let request = host.switchToHttp().getRequest();
    let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    if(request.url == "/favicon.ico"){

      logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);
      logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${JSON.stringify(error.message)}`);
      return;

    }

    request.metadata.errMsg = error.message;
    request.metadata.errCode = 1;
    request.timestamp = new Date().toISOString();
   logger.error(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
   logger.debug(`[${request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
  
   //let apierror =  this.appService.endMetaData(request.evUniqueID,1,error.message,request.metadata,'Error Handling');
  
   return response.status(status).json(request.metadata)

  }

}