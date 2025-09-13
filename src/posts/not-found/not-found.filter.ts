import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Request, Response } from 'express';
@Catch()
export class NotFoundFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
     const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(200).json({
      statusCode: 404,
      message:  'Resource not found',
      timestamp: new Date().toISOString(),
    });
  }
}
