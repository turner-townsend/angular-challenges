import { AdminRoutes } from '@angular-challenges/module-to-standalone/admin/feature';
import { IsAuthorizedGuard } from '@angular-challenges/module-to-standalone/admin/shared';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/home').then(
        (m) => m.ModuleToStandaloneHomeModule,
      ),
  },
  {
    path: 'admin',
    canActivate: [IsAuthorizedGuard],
    children: AdminRoutes,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/user/shell').then(
        (m) => m.UserShellModule,
      ),
  },

  {
    path: 'forbidden',
    loadChildren: () =>
      import('@angular-challenges/module-to-standalone/forbidden').then(
        (m) => m.ForbiddenModule,
      ),
  },
];
