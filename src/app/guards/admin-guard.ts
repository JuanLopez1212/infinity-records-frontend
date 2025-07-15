import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServices } from '../services/auth-services';



export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServices);
  const router = inject(Router);
  
  const expectedRoles = route.data[ 'expectedRoles' ] || []
  const isAuthorized = authService.hasRole( expectedRoles )

  if ( !isAuthorized ) {
    router.navigateByUrl( '/dashboard' )
  }

  return isAuthorized
};
