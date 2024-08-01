import { User } from '@angular-challenges/static-dynamic-import/data-user';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'sdi-user',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <mat-icon aria-hidden="false" aria-label="user icon" fontIcon="person" />
    <div>{{ user.name }} {{ user.lastName }}</div>
  `,
  host: {
    class: 'flex',
  },
})
export class UserComponent {
  @Input({ required: true }) user!: User;
}
