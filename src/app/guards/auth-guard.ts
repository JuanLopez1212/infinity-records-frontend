import { CanActivateFn, Router } from '@angular/router';
import { AuthServices } from '../services/auth-services';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject( AuthServices);
  const router = inject(Router);

  return authService.veryfyAuthenticateUser() 
  .pipe(
    map((data) =>{
      console.log('Guard',data);

      if(!data){
        router.navigateByUrl('Register');
        return false;
      }

      return true;
    }),
    catchError(() =>{
      return of(false);
    })
  );
  
};
