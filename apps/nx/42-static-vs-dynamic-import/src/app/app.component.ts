import { User } from '@angular-challenges/static-dynamic-import/data-user';
import { UserComponent } from '@angular-challenges/static-dynamic-import/ui-user';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [UserComponent, RouterOutlet],
  selector: 'app-root',
  template: `
    Author:
    <sdi-user [user]="author" />
    <router-outlet />
  `,
  host: {
    class: 'flex flex-col',
  },
})
export class AppComponent {
  author: User = {
    name: 'Thomas',
    lastName: 'Laforge',
    country: 'France',
  };
}
