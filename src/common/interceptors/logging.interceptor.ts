import { Injectable, NestInterceptor, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();
    if (request.user && !request.session.user) {
      request.session.user = request.user;
    }
    return call$.pipe(tap(() => {
    }));
  }
}
