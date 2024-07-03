import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.store';

@Component({
  selector: 'name',
  standalone: true,
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Name: {{ userService.name() }}
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class NameComponent {
  userService = inject(UserStore);
}
