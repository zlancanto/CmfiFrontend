import { Routes } from '@angular/router';
import { APP_ROUTE_PATHS, APP_ROUTE_REDIRECTS } from '@core/routing/app-route.constants';
import { appShellRoutes } from '@routes/app-shell.routes';
import { authRoutes } from '@routes/auth.routes';
import { errorRoutes } from '@routes/error.routes';

export const routes: Routes = [
  {
    path: APP_ROUTE_PATHS.auth.root,
    children: authRoutes
  },
  {
    path: APP_ROUTE_PATHS.error.root,
    children: errorRoutes
  },
  {
    path: '',
    loadComponent: () => import('@app/layout/app-layout').then((module) => module.AppLayout),
    children: appShellRoutes
  },
  {
    path: '**',
    redirectTo: APP_ROUTE_REDIRECTS.fallbackNotFound
  }
];
