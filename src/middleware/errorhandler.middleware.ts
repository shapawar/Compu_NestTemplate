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

    console.log("i am inside error");
    let response = host.switchToHttp().getResponse();
    let request = host.switchToHttp().getRequest();

    request.metadata.statusCode = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    request.metadata.message = error.message;
    request.metadata.errorname = error.name;
    request.metadata.body = request.body;
    request.metadata.params = request.params;
    request.timestamp = new Date().toISOString();

    return response.status(request.metadata.statusCode).json(request.metadata)
  }

}