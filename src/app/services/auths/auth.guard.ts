import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = route => {
  const router = inject(Router);
  const authService = inject(AuthService);
  if (authService.getisLoggedIn()) {
    const user = authService.getUser();
    const requiredRoles = route.data?.['roles'] as string[] | undefined;
    if (!requiredRoles || (user && requiredRoles.includes(user.role))) {
      return true;
    } else {
      alert(
        'You do not have access to this page. Please check with your Administrator.'
      );
      authService.logout();
      router.navigate(['/auth']);
      return false;
    }
  } else {
    alert('You do not have access to this page');
    authService.logout();
    router.navigate(['/auth']);
    return false;
  }
};
