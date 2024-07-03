import { CDFlashingDirective } from '@angular-challenges/shared/directives';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { UserStore } from './user.store';

@Component({
  selector: 'address-user',
  standalone: true,
  template: `
    <div cd-flash class="m-4 block border border-gray-500 p-4">
      Address:
      <div>Street: {{ userService.address.street() }}</div>
      <div>ZipCode: {{ userService.address.zipCode() }}</div>
      <div>City: {{ userService.address.city() }}</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CDFlashingDirective],
})
export class AddressComponent {
  userService = inject(UserStore);
}
