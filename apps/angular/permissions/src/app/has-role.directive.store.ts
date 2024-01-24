import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { of, switchMap } from 'rxjs';
import { Role } from './user.model';
import { UserStore } from './user.store';

export interface State {
  // the user must have any of these roles to granted
  roles: Role[];
  // the user must be superAdmin to be granted
  admin: boolean;
}

@Injectable()
export class HasRoleDirectiveStore extends ComponentStore<State> {
  #userStore = inject(UserStore);

  setRoles = this.updater((state, roles: Role[]) => ({ ...state, roles }));
  setSuperAdmin = this.updater((state, superAdmin: boolean) => ({
    ...state,
    admin: superAdmin,
  }));

  #roles$ = this.select((state) => state.roles);
  #admin$ = this.select((state) => state.admin);

  #userHasRoleRequirement$ = this.#roles$.pipe(
    switchMap((roles) => this.#userStore.userHasRole(roles)),
  );
  #userHasAdminRequirement$ = this.#admin$.pipe(
    switchMap((admin) => {
      if (!admin) {
        return of(true);
      }
      return this.#userStore.isAdmin$;
    }),
  );

  granted$ = this.select(
    this.#userHasRoleRequirement$,
    this.#userHasAdminRequirement$,
    (...reqs) => reqs.every(Boolean),
  );

  constructor() {
    super({ roles: [], admin: false });
  }
}
