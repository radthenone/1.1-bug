import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

export function AuthGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.userValue;
  if (user) {
    return true;
  }

  router.navigate(['/auth/login']);
  return false;
}

export function UnAuthorizedGuard(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.userValue;
  if (!user) {
    return true;
  }

  router.navigate(['/']);
  return false;
}
