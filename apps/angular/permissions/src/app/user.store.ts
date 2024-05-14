import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Role, User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private user = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user.asObservable();
  isAdmin$ = this.user$.pipe(map((user) => user?.isAdmin ?? false));

  add(user: User) {
    this.user.next(user);
  }

  userHasRole(role: Role[]) {
    return this.user$.pipe(
      map((user) => {
        if (!role.length || user?.isAdmin) {
          return true;
        }
        if (!user) {
          return false;
        }

        return user.roles.some((r) => role.includes(r));
      }),
    );
  }
}
