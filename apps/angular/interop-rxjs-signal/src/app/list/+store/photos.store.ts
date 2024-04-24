import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { withPhotos, withSearchParams } from './features';
import { getParamsFromStorage } from './storage';
import { setPage, setSearch } from './updaters';

export const PhotosStore = signalStore(
  withSearchParams(),
  withPhotos(),
  withComputed(({ page, pages }) => ({
    endOfPage: computed(() => page() === pages()),
  })),
  withMethods((store) => ({
    previousPage() {
      patchState(store, setPage(store.page() - 1));
    },
    nextPage() {
      patchState(store, setPage(store.page() + 1));
    },
    searchByText: rxMethod<string>(
      pipe(tap((search) => patchState(store, setSearch(search)))),
    ),
    initializeSearch(callback: (search: string) => void) {
      if (store.search().length >= 3) {
        callback(store.search());
      }
    },
  })),
  withHooks({
    onInit(store) {
      const savedState = getParamsFromStorage();
      if (savedState) {
        patchState(store, () => ({
          search: savedState.search,
          page: savedState.page,
        }));
      }

      store.searchPhotos(store.searchParams);
    },
  }),
);
