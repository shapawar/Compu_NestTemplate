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
* Handle error thrown from anywhere in whole application
*/
@Catch()
@Injectable()
export class ErrorFilter implements ExceptionFilter {

  MODULENAME = "ErrorFilter";
  response;
  request;

  //create instance
  constructor(private logger: LogService, private appService: AppService) { }

  async catch(error: Error, host: ArgumentsHost) {
    let debugName = 'Error-Servie';

    try {
      this.response = host.switchToHttp().getResponse();
      this.request = host.switchToHttp().getRequest();

      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}) `);

      let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

      if (this.request.url == "/favicon.ico") {
        return;
      }

      this.request.metadata.errMsg = error.message;
      this.request.metadata.errCode = 1;
      this.request.timestamp = new Date().toISOString();
      
      this.logger.error(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.message}`);
      this.logger.debug(`[${this.request.evUniqueID}] ${this.MODULENAME} (${debugName}): ${error.stack}`);

      const task = {
        name: debugName,
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