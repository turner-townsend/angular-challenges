import { Routes } from '@angular/router';

export const AdminRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.component'),
  },
  {
    path: 'create-user',
    loadChildren: () => import('./create-user/create-user.component'),
  },
];
