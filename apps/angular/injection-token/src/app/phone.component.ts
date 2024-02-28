import { Component, inject } from '@angular/core';
import { TIMER_DATA } from './app.config';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [TimerContainerComponent],
  providers: [{ provide: TIMER_DATA, useValue: 2000 }],
  template: `
    <div class="flex gap-2">
      Phone Call Timer:
      <p class="italic">(should be {{ timer }}s)</p>
    </div>
    <timer-container />
  `,
})
export default class PhoneComponent {
  timer = inject(TIMER_DATA);
}
