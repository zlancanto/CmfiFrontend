import { Routes } from '@angular/router';
import { APP_ROUTE_PATHS, APP_ROUTE_REDIRECTS } from '@core/routing/app-route.constants';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTE_REDIRECTS.authDefault
  },
  {
    path: APP_ROUTE_PATHS.auth.register,
    loadComponent: () =>
      import('@pages/auth/register/register-page').then((module) => module.RegisterPage)
  }
];
