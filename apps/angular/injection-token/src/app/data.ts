import { InjectionToken } from '@angular/core';

export const TIMER = new InjectionToken<number>('timer', {
  factory: () => 1_000,
});

export const getTimerProvider = (value: number) => ({
  provide: TIMER,
  useValue: value,
});
