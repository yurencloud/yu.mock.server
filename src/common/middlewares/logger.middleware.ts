import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import { Logger } from '../log/logger.log';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly log: Logger = new Logger();

  resolve(context: string): MiddlewareFunction {
    return (req, res, next) => {
      this.log.info(`Method: ${req.method}, Url: ${req.baseUrl}, Body: ${JSON.stringify(req.body)}`);
      next();
    };
  }
}