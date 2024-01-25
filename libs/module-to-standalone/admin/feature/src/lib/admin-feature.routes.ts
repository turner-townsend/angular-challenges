import { Route } from '@angular/router';

export const adminRoutes: Route[] = [
  {
    path: '',
    loadChildren: () => import('./dashboard').then((m) => m.dashboardRoutes),
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user').then((m) => m.createUserRoutes),
  },
];
