import { Component } from '@angular/core';
import { getTimerProvider } from './data';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [getTimerProvider(2_000)],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be 2000s)</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {}
