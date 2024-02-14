import { InjectionToken } from '@angular/core';

export const DEFAULT_TIMER = 1000;

export const TIMER = new InjectionToken<number>('timer', {
  factory: () => DEFAULT_TIMER,
});
