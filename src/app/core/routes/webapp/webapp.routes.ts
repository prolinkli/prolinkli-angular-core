import { Route } from '@angular/router';

export const WebAppRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('@pli-feature/home').then((m) => m.HomeComponent),
  },
];
