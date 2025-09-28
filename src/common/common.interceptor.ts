import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap, throwError, TimeoutError } from 'rxjs';

interface Response<T> {
  data: T;
}

@Injectable()
export class LoggerInterceptor<T> implements NestInterceptor<T, Response<T>> {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const userAgent = request.get('user-agent') || 'unknown';
    const userId = request?.user?.id || 'unauthenticated';

    this.logger.log(
      `[${method} ${url} - User: ${userId} - User-Agent: ${userAgent}]`,
    );

    const startTime = Date.now();

    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new BadRequestException());
        }
        return throwError(() => err);
      }),
      tap(() =>
        console.log(`⬅️ Response sent in ${Date.now() - startTime}ms`),
      ),
    )
    ;
  }
}
