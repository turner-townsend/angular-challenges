import { ApplicationConfig, InjectionToken } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DEFAULT_TIMER } from './data';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'video' },
      { path: 'video', loadComponent: () => import('./video.component') },
      { path: 'phone', loadComponent: () => import('./phone.component') },
    ]),
  ],
};

export const TIMER_DATA = new InjectionToken<number>('timer_data', {
  factory: () => DEFAULT_TIMER,
});
