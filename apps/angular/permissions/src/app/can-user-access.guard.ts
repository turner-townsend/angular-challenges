import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';
import { hasAnyUserRole } from './user.utils';

export const canUserAccessGuard: CanActivateFn = (
  route,
): Observable<boolean> => {
  const userStore = inject(UserStore);

  const role = route.data['role'];

  return userStore.user$.pipe(
    filter((user) => !!user),
    map((user) => {
      if (role === 'admin' && user?.isAdmin) {
        return true;
      }

      if (role) {
        return !!(user?.name && hasAnyUserRole(user, [role as Role]));
      } else {
        return false;
      }
    }),
  );
};
