import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {
  
  constructor( private http: HttpClient )  { }

  loginUser ( credentials: any ) {    // Credenciales: 
    return this.http.post ( 'http://localhost:3000/api/auth/login', credentials )
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
      map( ( data: any ) => {
        console.log ( 'Service', data )

        return data.token 
      }),
      catchError( () => {
        return of( false )
      })
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
}

