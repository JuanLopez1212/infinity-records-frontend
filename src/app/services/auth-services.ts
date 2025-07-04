import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  constructor(private http:HttpClient ) {


   }

   loginUser( credentials: any ){     //credenciales: 
     return this.http.post('http://localhost:3000/api/auth/login', credentials);
    }
    
    saveLocalStorage(key: string, value: any ){
      localStorage.setItem( key, value)
    }

    //Sirve para eliminar cualquier llave del localStorage 
    deleteLocalStorage (key: string){
      localStorage.removeItem(key);  
    }


verifyAuthenticateUser(){
      return this.http.get('http://localhost:3000/api/auth/re-new-token',{headers: this.getHeaders()})
      .pipe( 
        map ( (data: any) => {
          console.log('Services',data);

          return data.token;
        }) , 
        catchError( () => { 
          return of(false);
        } )
    );
    }



    //Verificar el usuario autenticado
    // verifyAuthenticateUser(){
    //   return this.http.get('http://localhost:3000/api/auth/re-new-token',{headers: this.getHeaders()})
    //   .pipe( 
    //     tap ( (data) => {
    //       console.log(data);
    //     }) , 

    //     map((newData : any) => {
    //       return newData.token
    //     }),

    //     catchError( () => { 
    //        return of(false);
    //     }  )
    // );
    // }

    
    getHeaders(){
      const token = localStorage.getItem('token') ?? '';
      return new HttpHeaders().set('X-Token', token);
    }


}
