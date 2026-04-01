import { Routes } from '@angular/router';

const placeholderPages = [
  { path: 'cms', title: 'CMS' },
  { path: 'chat', title: 'Chat' },
  { path: 'files', title: 'Files' },
  { path: 'mail', title: 'Mail' },
  { path: 'task-list', title: 'Task List' },
  { path: 'form-layout', title: 'Form Layout' },
  { path: 'input', title: 'Input' },
  { path: 'button', title: 'Button' },
  { path: 'table', title: 'Table' }
] as const;

const coreTransversalErrorSlugs = [
  'bad-request',
  'unauthenticated',
  'forbidden',
  'not-found',
  'conflict',
  'gone',
  'validation-error',
  'locked',
  'rate-limited',
  'legal-restriction',
  'internal-error',
  'bad-gateway',
  'service-unavailable',
  'gateway-timeout',
  'offline',
  'unsupported-browser',
  'feature-disabled'
] as const;

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register'
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register-page').then((m) => m.RegisterPage)
      }
    ]
  },
  {
    path: 'error',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'internal-error'
      },
      ...coreTransversalErrorSlugs.map((slug) => ({
        path: slug,
        loadComponent: () => import('./pages/error/error-page').then((m) => m.ErrorPage),
        data: { slug }
      })),
      {
        path: '**',
        redirectTo: 'not-found'
      }
    ]
  },
  {
    path: '',
    loadComponent: () => import('./layout/app-layout').then((m) => m.AppLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard-page').then((m) => m.DashboardPage)
      },
      ...placeholderPages.map((page) => ({
        path: page.path,
        loadComponent: () =>
          import('./pages/placeholder/placeholder-page').then((m) => m.PlaceholderPage),
        data: { title: page.title }
      }))
    ]
  },
  {
    path: '**',
    redirectTo: 'error/not-found'
  }
];
