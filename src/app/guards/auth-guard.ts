import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth-services';
import { catchError, map, of, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthServices )
  const router = inject( Router)

  return authService.verifyUser().pipe(
    map(isAuthenticated => {
      console.log('User88888888:', isAuthenticated);
      if ( !isAuthenticated ) {
        router.navigateByUrl( 'login' )
      }
      return isAuthenticated
    })
  )
};

