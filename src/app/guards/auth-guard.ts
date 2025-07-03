import { CanActivateFn } from '@angular/router';
import { AuthServices } from '../services/auth-services';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthServices);
  authService.veryfyAuthenticateUser().subscribe ({
    next: (data) => {
      console.log(data);
    },
    error: (error) => {
      console.error(error);
    },
    complete: ()=> {}

  });

  return true;
};
