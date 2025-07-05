import { Routes } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { WebAppRoutes } from './webapp/webapp.routes';
import { LoggedOutGuard } from '../guard/loggedout.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('@pli-feature/admin-dashboard').then(
        (m) => m.AdminDashboardComponent,
      ),
    canActivate: [AuthGuard], // Changed from LoggedOutGuard to AuthGuard
    data: {
      title: 'Admin Dashboard',
      breadcrumb: 'Admin Dashboard',
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('@pli-feature/login').then((m) => m.LoginComponent),
    canActivate: [LoggedOutGuard],
    data: {
      title: 'Login',
      breadcrumb: 'Login',
    },
  },
  {
    path: 'app',
    children: WebAppRoutes,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/app', // Changed back to /app since guards handle redirects properly
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/app', // Changed back to /app since guards handle redirects properly
    pathMatch: 'full',
  },
];
