import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Role, User } from '../user.model';
import { UserStore } from '../user.store';
import { hasAnyUserRole } from '../user.utils';

@Directive({
  standalone: true,
  selector: '[hasRole], [hasRoleSuperAdmin]',
})
export class HasRoleDirective implements OnInit, OnDestroy {
  @Input() set hasRole(role: Role | Role[] | undefined) {
    this.roles = role;
    this.updateRolesView();
  }

  @Input() set hasRoleSuperAdmin(superAdmin: boolean | undefined) {
    this.superAdmin = superAdmin;
    this.updateSuperAdminView();
  }

  private roles: Role | Role[] | undefined;
  private superAdmin: boolean | undefined;

  private hasView = false;
  private user: User | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userStore: UserStore,
  ) {}

  ngOnInit() {
    this.userStore.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.user = user;
      if (this.superAdmin !== undefined) {
        this.updateSuperAdminView();
      } else if (this.roles) {
        this.updateRolesView();
      }
    });
  }

  private updateSuperAdminView(): void {
    if (this.hasAdminRole()) {
      this.createView();
    } else {
      this.clearView();
    }
  }

  private updateRolesView(): void {
    if (hasAnyUserRole(this.user, this.roles)) {
      this.createView();
    } else {
      this.clearView();
    }
  }

  private hasAdminRole(): boolean {
    return (this.superAdmin && this.user?.isAdmin) || false;
  }

  private createView(): void {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }

  private clearView(): void {
    this.viewContainer.clear();
    this.hasView = false;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
