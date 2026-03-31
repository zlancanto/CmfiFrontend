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

export const routes: Routes = [
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
    redirectTo: ''
  }
];
