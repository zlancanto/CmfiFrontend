import { Routes } from '@angular/router';
import {
  APP_ROUTE_REDIRECTS,
  CORE_TRANSVERSAL_ERROR_SLUGS
} from '@core/routing/app-route.constants';

export const errorRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: APP_ROUTE_REDIRECTS.errorDefault
  },
  ...CORE_TRANSVERSAL_ERROR_SLUGS.map((slug) => ({
    path: slug,
    loadComponent: () => import('@pages/error/error-page').then((module) => module.ErrorPage),
    data: { slug }
  })),
  {
    path: '**',
    redirectTo: APP_ROUTE_REDIRECTS.errorNotFound
  }
];
