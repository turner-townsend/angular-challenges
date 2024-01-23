import { inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CanMatchFn } from '@angular/router';
import { UserStore } from '../user.store';

export const dasboardGuard: CanMatchFn = (): boolean => {
  const store = inject(UserStore);
  const user = toSignal(store.user$);

  return !!user()?.roles.includes('MANAGER');
};

export const dashboardAdminGuard: CanMatchFn = (): boolean => {
  const store = inject(UserStore);
  const user = toSignal(store.user$);

  return !!user()?.isAdmin;
};
