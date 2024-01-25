import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-no-access',
  imports: [ButtonComponent, RouterLink],
  template: `
    <h2 class="text-xl">No Access</h2>
    <div class="mt-10">Sorry, you don't have access to this page.</div>
    <button class="mt-10" app-button routerLink="/">Back</button>
  `,
  standalone: true,
})
export class NoAccessComponent {}
