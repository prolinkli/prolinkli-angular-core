import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('@pli-feature/admin-dashboard').then(m => m.AdminDashboardComponent),
    data: {
      title: 'Admin Dashboard',
      breadcrumb: 'Admin Dashboard'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('@pli-feature/login').then(m => m.LoginComponent),
    data: {
      title: 'Login',
      breadcrumb: 'Login'
    }
  },
  {
    path: 'app',
    loadComponent: () => import('@pli-feature/home').then(m => m.HomeComponent),
  },
  //TODO: probably want to move this route to the home lib - just because the home page could be different based on the user's role
  {
    path: '',
    loadComponent: () => import('@pli-feature/home').then(m => m.HomeComponent),
  }
];
