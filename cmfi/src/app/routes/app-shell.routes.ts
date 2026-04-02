import { Routes } from '@angular/router';
import {
  APP_PLACEHOLDER_ROUTE_DEFINITIONS,
  APP_ROUTE_PATHS,
  APP_ROUTE_REDIRECTS
} from '@core/routing/app-route.constants';

export const appShellRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTE_REDIRECTS.appDefault
  },
  {
    path: APP_ROUTE_PATHS.dashboard,
    loadComponent: () =>
      import('@pages/dashboard/dashboard-page').then((module) => module.DashboardPage)
  },
  ...APP_PLACEHOLDER_ROUTE_DEFINITIONS.map((page) => ({
    path: page.path,
    loadComponent: () =>
      import('@pages/placeholder/placeholder-page').then((module) => module.PlaceholderPage),
    data: { title: page.title }
  }))
];
