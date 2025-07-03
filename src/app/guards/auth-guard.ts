import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthServices } from '../services/auth-services';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthServices )

  authService.verifyAuthenticateUser().subscribe({
    next: ( data ) => {
      console.log( data );
    },
    error: ( error ) => {
      console.error ( error )
    },
    complete: () => {}
  })

  return true;
};
