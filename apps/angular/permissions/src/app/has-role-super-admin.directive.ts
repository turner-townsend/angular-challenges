import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserStore } from './user.store';

@Directive({
  standalone: true,
  selector: '[appHasRoleSuperAdmin]',
})
export class HasRoleSuperAdminDirective {
  #userStore = inject(UserStore);
  #templateRef = inject(TemplateRef<unknown>);
  #viewContainer = inject(ViewContainerRef);
  #user = toSignal(this.#userStore.user$);
  #hasView = false;
  #superAdmin = signal<boolean>(false);

  constructor() {
    effect(() => {
      const render = this.#superAdmin() && !!this.#user()?.isAdmin;
      if (render && !this.#hasView) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
      } else if (!render && this.#hasView) {
        this.#viewContainer.clear();
      }

      this.#hasView = render;
    });
  }

  @Input() set appHasRoleSuperAdmin(sa: boolean) {
    this.#superAdmin.set(sa);
  }
}
