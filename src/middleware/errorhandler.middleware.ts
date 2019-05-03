import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {

  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let request = host.switchToHttp().getRequest();
  
    
    let metadata= {
      metadata: response.locals.apiMeta,
      statusCode:0,
      errorname:'',
      message:'',
      params:request.params,
      body:request.body,
      timestamp: new Date().toISOString()
      
    }
    
    metadata.statusCode = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;;
    metadata.message = error.message;;
    metadata.errorname = error.name;
    return response.status(metadata.statusCode).json(metadata)
  } 
}