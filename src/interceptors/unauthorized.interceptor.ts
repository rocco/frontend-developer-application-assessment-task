import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const UnauthorizedInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        const locationUrl = `/auth-service/authenticate/start?application=p-p-dev&path=/portal&lang=DE`;
        window.location.replace(locationUrl);
      } else {
        return throwError(() => error);
      }
      return EMPTY;
    }),
  );
};
