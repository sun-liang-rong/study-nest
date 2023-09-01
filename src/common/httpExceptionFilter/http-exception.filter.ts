import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost){
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const rspData = exception.getResponse() as any;
    const status = exception.getStatus() ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    console.log(rspData, 'rspData------->')
    response.status(status).json({
      codeStatus: rspData.statusCode || status,
      timestamp: new Date().toISOString(),
      message: rspData.message || '服务器异常',
      path: request.url,
    })
  }
}