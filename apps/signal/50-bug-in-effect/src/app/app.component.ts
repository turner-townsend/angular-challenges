import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  model,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [FormsModule],
  selector: 'app-root',
  template: `
    <section class="flex gap-5">
      <p>MacBook</p>
      <p>1999,99 €</p>
    </section>

    <section>
      <p>Extras:</p>

      <div>
        <input type="checkbox" [(ngModel)]="drive" />
        +500 GB drive-space
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="ram" />
        +4 GB RAM
      </div>
      <div>
        <input type="checkbox" [(ngModel)]="gpu" />
        Better GPU
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  drive = model(false);
  ram = model(false);
  gpu = model(false);

  #checkedCountIfIncreased = computed(
    () => {
      return [this.drive(), this.ram(), this.gpu()].filter(Boolean).length;
    },
    { equal: (a, b) => a >= b },
  );

  constructor() {
    /*
      Using short-circuiting with the only references to the signals inside an effect
       will cause the other signals not to be tracked if a signal before it evaluates to true

      To ensure the signals are tracked you can create constants for each signal evaluation
        However this results in the ACs not being met, as it will trigger the alert for any change
        to the selected checked boxes, unless the result is that none are checked

      The cleaner approach would be to use toObservable and use a pairWise operator to compare the values
        to decide if the dialog should be shown
      In the spirit of the challenge, the same outcome can be achieved by abusing the `equal` option of a computed signal
        so you can control if the effect is triggered or not when the signals are set

    */

    effect(() => {
      if (this.#checkedCountIfIncreased()) {
        alert('Price increased!');
      }
    });
  }
}
