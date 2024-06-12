import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class HeavyCalculationService {
  private finalLength = 664579;
  private loadingLength = signal(0);

  loadingPercentage = computed(
    () => (this.loadingLength() * 100) / this.finalLength,
  );

  startLoading() {
    this.randomHeavyCalculationFunction();
  }

  private randomHeavyCalculationFunction() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker(
        new URL('./heavy-calculation.worker', import.meta.url),
      );
      worker.onmessage = () => {
        this.loadingLength.update((l) => l + 1);
      };
      worker.postMessage('');
    } else {
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
}
