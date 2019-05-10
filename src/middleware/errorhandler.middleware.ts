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
    let status = (error instanceof HttpException) ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const objData = {
      metadata: {},
      status: 0,
      message: "",
      errorname: "",
      body: "",
      params: "",
      timestamp: "",
    }
    request.metadata.errMsg = error.message;
    request.metadata.errCode = 1;
    objData.metadata = request.metadata;
    objData.status = status;
    objData.message = error.message;
    objData.errorname = error.name;
    objData.body = request.body;
    objData.params = request.params;
    objData.timestamp = new Date().toISOString();

    request.metadata = objData;
    return response.status(status).json(request.metadata)
  }

}