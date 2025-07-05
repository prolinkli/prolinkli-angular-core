import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { routes } from './routes/app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { CookieInterceptor } from '../shared/data-access/src/interceptors/cookies.interceptor';
import { ErrorInterceptor } from '../shared/data-access/src/interceptors/error.interceptor';
import { LoadingInterceptor } from '../shared/data-access/src/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CookieInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    provideClientHydration(withEventReplay())
  ]
};
