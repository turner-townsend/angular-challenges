import { Injectable } from '@angular/core';
import { patchState, signalState } from '@ngrx/signals';

type User = {
  name: string;
  address: {
    street: string;
    zipCode: string;
    city: string;
  };
  note: string;
  title: string;
  salary: number;
};

@Injectable({ providedIn: 'root' })
export class UserStore {
  user = signalState<User>({
    name: 'Bob',
    address: {
      street: '',
      zipCode: '',
      city: '',
    },
    note: '',
    title: '',
    salary: 0,
  });

  updateUser = (updater: (user: User) => User) =>
    patchState(this.user, updater);
}
