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
  }
];
