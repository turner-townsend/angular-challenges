import { Component, inject } from '@angular/core';
import { TIMER_DATA } from './app.config';
import { TimerContainerComponent } from './timer-container.component';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [TimerContainerComponent],
  template: `
    <div class="flex gap-2">
      Video Call Timer:
      <p class="italic">(should be the default {{ timer }}s)</p>
    </div>
    <timer-container />
  `,
})
export default class VideoComponent {
  timer = inject(TIMER_DATA);
}
