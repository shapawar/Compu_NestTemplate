/* 
* Nset and third party imports
*/
import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

/* 
* Error Handler middleware
* Handle all catch error throw by try block
*/
@Catch()
export class ErrorFilter implements ExceptionFilter {


  /* 
*Configure error Handler middleware
*/
  catch(error: Error, host: ArgumentsHost) {


    let response = host.switchToHttp().getResponse();
    let request = host.switchToHttp().getRequest();

    /* 
    * Create metadata response 
    */
    let metadata = {
      metadata: response.locals.apiMeta,
      statusCode: 0,
      errorname: '',
      message: '',
      params: request.params,
      body: request.body,
      timestamp: new Date().toISOString()

    }

    metadata.statusCode = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    metadata.message = error.message;
    metadata.errorname = error.name;
    return response.status(metadata.statusCode).json(metadata)
  }

}