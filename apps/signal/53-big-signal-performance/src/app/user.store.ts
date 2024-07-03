import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
export interface UserDetails {
  name: string;
  address: {
    street: string;
    zipCode: string;
    city: string;
  };
  note: string;

  title: string;
  salary: number;
}

const initialState = {
  name: 'Bob',
  address: {
    street: '',
    zipCode: '',
    city: '',
  },
  title: '',
  salary: 0,
  note: '',
};

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    submitForm(formValue: UserDetails): void {
      patchState(store, () => formValue);
    },
  })),
);
