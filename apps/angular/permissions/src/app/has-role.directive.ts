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
import { Role } from './user.model';
import { UserStore } from './user.store';

@Directive({
  standalone: true,
  selector: '[appHasRole]',
})
export class HasRoleDirective {
  #userStore = inject(UserStore);
  #templateRef = inject(TemplateRef<unknown>);
  #viewContainer = inject(ViewContainerRef);
  #user = toSignal(this.#userStore.user$);
  #hasView = false;
  #role = signal<Role | Role[]>([]);

  constructor() {
    effect(() => {
      const role = this.#role();
      const render = Array.isArray(role)
        ? role.some((r) => this.checkRole(r))
        : this.checkRole(role);

      if (render && !this.#hasView) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
      } else if (!render && this.#hasView) {
        this.#viewContainer.clear();
      }

      this.#hasView = render;
    });
  }

  @Input() set appHasRole(role: Role | Role[]) {
    this.#role.set(role);
  }

  private checkRole(role: Role): boolean {
    return this.#user()?.roles.includes(role) ?? false;
  }
}
