import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/component-store';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe } from 'rxjs';
import { filter, mergeMap, tap } from 'rxjs/operators';
import { PhotoService } from '../../photos.service';
import { PhotoState } from './models';
import { setParamsInStorage } from './storage';
import { setError, setLoading, setPhotos } from './updaters';

export const withRequestStatus = () =>
  signalStoreFeature(
    withState<Pick<PhotoState, 'loading' | 'error'>>({
      loading: false,
      error: '',
    }),
  );

export const withSearchParams = () =>
  signalStoreFeature(
    withState<Pick<PhotoState, 'search' | 'page'>>({ search: '', page: 1 }),
    withComputed(({ page, search }) => ({
      searchParams: computed(() => ({ search: search(), page: page() })),
    })),
  );

export const withPhotos = () =>
  signalStoreFeature(
    withState<Pick<PhotoState, 'photos' | 'pages'>>({ photos: [], pages: 1 }),
    withRequestStatus(),
    withMethods((store, photoService = inject(PhotoService)) => ({
      searchPhotos: rxMethod(
        pipe(
          filter(
            ({ search }: { search: string; page: number }) =>
              search.length >= 3,
          ),
          tap(() => patchState(store, setLoading(true))),
          mergeMap(({ search, page }) =>
            photoService.searchPublicPhotos(search, page).pipe(
              tapResponse(
                ({ photos: { photo, pages } }) => {
                  patchState(store, setPhotos(photo, pages), setLoading(false));
                  setParamsInStorage(search, page);
                },
                (error) =>
                  patchState(store, setLoading(false), setError(error)),
              ),
            ),
          ),
        ),
      ),
    })),
  );
