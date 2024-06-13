import { computed, Injectable, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private finalLength = 664579;
  private loadingLength = signal(0);
  private worker?: Worker;

  loadingPercentage = computed(
    () => (this.loadingLength() * 100) / this.finalLength,
  );

  startLoading() {
    if (this.worker) {
      this.worker.terminate();
      this.loadingLength.set(0);
    }
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker = new Worker(new URL('./heavy.worker', import.meta.url));
      this.worker.onmessage = () => {
        this.loadingLength.update((l) => l + 1);
      };
      this.worker.postMessage('');
    } else {
      this.randomHeavyCalculationFunction();
    }
  }

  private randomHeavyCalculationFunction() {
    for (let num = 2; num <= 10000000; num++) {
      let randomFlag = true;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
          randomFlag = false;
          break;
        }
      }
      if (randomFlag) {
        this.loadingLength.update((l) => l + 1);
      }
    }
  }
}
