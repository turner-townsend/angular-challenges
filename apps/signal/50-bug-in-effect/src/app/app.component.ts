import {
  ChangeDetectionStrategy,
  Component,
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

  constructor() {
    /*
      Explain for your junior team mate why this bug occurs ...

      Short circuiting. Once this.drive() becomes true, the other signals are not evaluated/considered until this.drive() becomes false again.
      ALSO, this logic will alert if all three are checked and drive is subsequently unchecked. This is not the expected behavior.
    */

    effect(() => {
      if (this.drive()) {
        alert('Price increased!');
      }
    });

    effect(() => {
      if (this.ram()) {
        alert('Price increased!');
      }
    });

    effect(() => {
      if (this.gpu()) {
        alert('Price increased!');
      }
    });
  }
}
