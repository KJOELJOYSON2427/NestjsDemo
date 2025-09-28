import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
   const { method, originalUrl, ip } = req;
    const userAgent = req.get('user-agent') || 'unknown';

    this.logger.log(
      `➡️ ${method} ${originalUrl} - User-Agent: ${userAgent} - IP: ${ip} ${Date.now()}`,
    );

    req['startTime']= Date.now()

    res.on('finish',()=>{
      const {statusCode}=res;
      const duration = Date.now() - req['startTime']
      this.logger.log(
        `⬅️ ${method} ${originalUrl} - Status: ${statusCode} - IP: ${ip}  Duration: ${duration}`,
      );
    })

    next();
  }
}
