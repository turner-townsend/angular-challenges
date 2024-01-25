import { Role, User } from './user.model';

export function hasAnyUserRole(
  user: User | undefined,
  roles: Role | Role[] | undefined,
) {
  const userRoles = user?.roles || [];
  const rolesToCheck = typeof roles === 'string' ? [roles] : roles || [];
  return rolesToCheck.some((role) => userRoles.includes(role));
}
