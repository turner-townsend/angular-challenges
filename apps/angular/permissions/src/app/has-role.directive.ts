import {
  booleanAttribute,
  Directive,
  inject,
  Input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { HasRoleDirectiveStore } from './has-role.directive.store';
import { Role } from './user.model';

const coerceArray = (value: Role | Role[]): Role[] =>
  typeof value === 'string' ? [value] : value;

@Directive({
  standalone: true,
  selector: '[appHasRole], [appHasRoleSuperAdmin]',
  providers: [HasRoleDirectiveStore],
})
export class HasRoleDirective {
  #viewContainer = inject(ViewContainerRef);
  #templateRef = inject(TemplateRef);
  #store = inject(HasRoleDirectiveStore);

  @Input() set appHasRole(v: Role | Role[]) {
    const roles = coerceArray(v);

    this.#store.setRoles(roles);
  }

  @Input({ transform: booleanAttribute }) set appHasRoleSuperAdmin(v: boolean) {
    this.#store.setSuperAdmin(v);
  }

  ngOnInit() {
    this.#store.granted$.subscribe((granted) => {
      if (granted) {
        this.#viewContainer.createEmbeddedView(this.#templateRef);
      } else if (!granted) {
        this.#viewContainer.clear();
      }
    });
  }
}
