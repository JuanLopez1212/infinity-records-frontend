import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  
  constructor( private http: HttpClient )  { }

  loginUser ( credentials: any ) {    // Credenciales: 
    return this.http.post ( 'http://localhost:3000/api/auth/login', credentials ).pipe(
      tap(( resp: any) => {
        if ( resp.user ) {
          this.saveLocalStorage( 'user', JSON.stringify( resp.user ))
        }
        if ( resp.token ) {
          this.saveLocalStorage( 'token', resp.token )
        }
      })
    )
  }

  verifyUser () {
    return this.http.get('http://localhost:3000/api/auth/re-new-token', { headers: this.getHeaders() }).pipe(
      tap(( resp: any ) => {
        console.log('User:', resp);
        if ( resp.user ) {
          this.saveLocalStorage( 'user', JSON.stringify( resp.user ))
        }
        if ( resp.token ) {
          this.saveLocalStorage( 'token', resp.token )
        }
      }),
      map(() => true ),
          catchError( error => {
          console.error( error );
          localStorage.removeItem( 'token' );
          localStorage.removeItem( 'authUserData' );

          return of( false );
        })
    )
  }

  hasRole( expectedRoles: string[]): boolean {
    const userStr = localStorage.getItem( 'user' )
    if (!userStr) return false 

    const user = JSON.parse ( userStr )
    return expectedRoles.includes ( user.role )
  }

  saveLocalStorage ( key: string, value: any ) {
    localStorage.setItem( key, value ) 
  }

  // Eliminar cualquier llave del localStorage
  deleteLocalStorage ( key: string ) {
    localStorage.removeItem ( key ) 
  }

  // Verificar el usuario autenticado
  verifyAuthenticateUser () {
    return this.http.get ( 'http://localhost:3000/api/auth/re-new-token', { headers: this.getHeaders() } )
      .pipe(
        tap(( resp: any ) => {
          if ( resp.user ) {
            this.saveLocalStorage ( 'user', JSON.stringify( resp.user ) )
          }
          if ( resp.token ) {
            this.saveLocalStorage( 'token', resp.token )
          }
        }),
        map(() => true ),
        catchError(() => of(false))
      )

    // Ejemplom para explicar como funciona rxjs
    // return this.http.get ( 'http://localhost:3000/api/auth/re-new-token', { headers: this.getHeaders() } )
    //             .pipe( 
    //               tap( ( data ) => {
    //                 console.log ( data )

    //                 return data 
    //               }),
    //               map( ( newData: any ) => {
    //                 return newData.token.length
    //               } ),
    //               catchError( () => {
    //                 return of( false )  
    //               }) 
    //              )
  }

  getHeaders () {
    const token = localStorage.getItem ( 'token' ) ?? ''     // Obtiene el token del localStorage
    return new HttpHeaders().set( 'X-Token', token )  // Envuelve el token en una Header tipo Http
  }

  getCurrentUser () {
    const userStr = localStorage.getItem ( 'user' ) || '{}'
    if ( !userStr ) return null
    return JSON.parse ( userStr )
  }
}