import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Signal, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingInterceptor implements HttpInterceptor {
  //TODO: convert into a proper map
  private loading = signal(false);
  readonly loadingSignal: Signal<boolean> = this.loading.asReadonly();
  readonly loading$ = toObservable(this.loadingSignal);

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
        this.loading.set(true);
      }),
      finalize(() => {
        this.loading.set(false);
      }),
    );
  }
}
