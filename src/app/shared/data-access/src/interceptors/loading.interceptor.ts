import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  readonly loadingService = inject(LoadingService);

  /**
   * Intercepts HTTP requests to handle loading states.
   * This method is called for every HTTP request made by the application.
   *
   * @param req - The outgoing HTTP request.
   * @param next - The next interceptor in the chain.
   * @returns An observable of the HTTP response.
   */
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // This is a placeholder for the actual implementation of the loading interceptor.
    // It should handle the request and return an observable.

    return next.handle(req).pipe(
      tap(() => {
        this.loadingService.loading.set(true);
      }),
      finalize(() => {
        this.loadingService.loading.set(false);
      }),
    );
  }
}
