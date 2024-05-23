import { Route } from '@angular/router';

export const contactFeatureRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'create-contact',
    loadChildren: () =>
      import('./create-contact/create-contact.routes').then(
        (m) => m.createContactRoutes,
      ),
  },
];
