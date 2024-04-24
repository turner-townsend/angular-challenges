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
import { filter, mergeMap, pipe, tap } from 'rxjs';
import { Photo } from '../photo.model';
import { PhotoService } from '../photos.service';

const PHOTO_STATE_KEY = 'photo_search';
export interface PhotoState {
  photos: Photo[];
  searchPhrase: string;
  page: number;
  pages: number;
  loading: boolean;
  error: unknown;
}

const initialState: PhotoState = {
  photos: [],
  searchPhrase: '',
  page: 1,
  pages: 1,
  loading: false,
  error: '',
};

export const PhotoStore = signalStore(
  withState(initialState),

  withComputed(({ searchPhrase, page, pages }) => ({
    endOfPage: computed(() => page() === pages()),
    searchAndPage: computed(() => ({
      search: searchPhrase(),
      page: page(),
    })),
  })),

  withMethods((store, photoService = inject(PhotoService)) => ({
    search: rxMethod<string>(
      pipe(tap((searchPhrase) => patchState(store, { searchPhrase, page: 1 }))),
    ),
    nextPage(): void {
      patchState(store, ({ page }) => ({ page: page + 1 }));
    },
    previousPage(): void {
      patchState(store, ({ page }) => ({ page: page - 1 }));
    },
    searchPhotos: rxMethod<{ search: string; page: number }>(
      pipe(
        filter(({ search }) => search.length >= 3),
        tap(() => patchState(store, () => ({ loading: true, error: '' }))),
        mergeMap(({ search, page }) =>
          photoService.searchPublicPhotos(search, page).pipe(
            tapResponse(
              ({ photos: { photo, pages } }) => {
                patchState(store, () => ({
                  loading: false,
                  photos: photo,
                  pages,
                }));
                localStorage.setItem(
                  PHOTO_STATE_KEY,
                  JSON.stringify({ search, page }),
                );
              },
              (error: unknown) =>
                patchState(store, () => ({ error, loading: false })),
            ),
          ),
        ),
      ),
    ),
  })),

  withHooks({
    onInit(store) {
      const savedJSONState = localStorage.getItem(PHOTO_STATE_KEY);
      if (savedJSONState === null) {
        patchState(store, () => initialState);
      } else {
        const savedState = JSON.parse(savedJSONState);
        patchState(store, () => ({
          search: savedState.search,
          page: savedState.page,
        }));
      }

      store.searchPhotos(store.searchAndPage);
    },
  }),
);
