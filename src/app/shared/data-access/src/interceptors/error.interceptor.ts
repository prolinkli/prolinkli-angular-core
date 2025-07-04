import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle specific status codes
        if (error.status === 401) {
          console.error('Unauthorized request:', error);
          // maybe redirect to login
        } else if (error.status === 403) {
          console.error('Forbidden request:', error);
          // show forbidden message
        }
        return throwError(() => error);
      })
    );
  }
}

