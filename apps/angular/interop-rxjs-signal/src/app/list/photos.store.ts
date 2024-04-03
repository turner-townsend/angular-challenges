import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';

type PhotoState = {
  photos: Photo[];
  searchText: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
};

const initialState: PhotoState = {
  photos: [],
  searchText: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

export const PhotosStore = signalStore(
  withState(initialState),
  withComputed(({ page, pages, searchText }) => ({
    endOfPage: computed(() => page() === pages()),
    params: computed(() => ({ searchText: searchText(), page: page() })),
  })),
  withMethods((store, photoService = inject(PhotoService)) => ({
    search: rxMethod<string>(
      pipe(tap((searchText) => patchState(store, { searchText, page: 1 }))),
    ),
    nextPage() {
      patchState(store, { page: store.page() + 1 });
    },
    previousPage() {
      patchState(store, { page: store.page() - 1 });
    },
    searchPhotos: rxMethod<{ searchText: string; page: number }>(
      pipe(
        filter(({ searchText }) => searchText.length >= 3),
        tap(() => patchState(store, { loading: true, error: '' })),
        mergeMap(({ searchText, page }) =>
          photoService.searchPublicPhotos(searchText, page).pipe(
            tapResponse(
              ({ photos: { photo, pages } }) => {
                patchState(store, {
                  loading: false,
                  photos: photo,
                  pages,
                });
                localStorage.setItem(
                  PHOTO_STATE_KEY,
                  JSON.stringify({ searchText, page }),
                );
              },
              (error: unknown) => patchState(store, { error, loading: false }),
            ),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      if (savedJSONState) {
        const savedState = JSON.parse(savedJSONState);
        patchState(store, () => ({
          searchText: savedState.searchText,
          page: savedState.page,
        }));
      }

      store.searchPhotos(store.params);
    },
  }),
);
