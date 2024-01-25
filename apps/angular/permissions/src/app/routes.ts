import { canUserAccessGuard } from './can-user-access.guard';

export const APP_ROUTES = [
  {
    path: '',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'enter',
    canMatch: [canUserAccessGuard],
    data: {
      role: 'admin',
    },
    loadComponent: () =>
      import('./dashboard/admin.component').then(
        (m) => m.AdminDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [canUserAccessGuard],
    data: {
      role: 'MANAGER',
    },
    loadComponent: () =>
      import('./dashboard/manager.component').then(
        (m) => m.ManagerDashboardComponent,
      ),
  },
  {
    path: 'enter',
    canMatch: [canUserAccessGuard],
    data: {
      role: 'READER',
    },
    loadComponent: () =>
      import('./dashboard/reader.component').then((m) => m.ReaderComponent),
  },
  {
    path: 'enter',
    canMatch: [canUserAccessGuard],
    data: {
      role: 'WRITER',
    },
    loadComponent: () =>
      import('./dashboard/writer.component').then((m) => m.WriterComponent),
  },
  {
    path: 'enter',
    canMatch: [canUserAccessGuard],
    data: {
      role: 'CLIENT',
    },
    loadComponent: () =>
      import('./dashboard/client.component').then((m) => m.ClientComponent),
  },
];
