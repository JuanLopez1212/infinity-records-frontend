import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

    //Verificar el usuario autenticado
    verifyAuthenticateUser(){
      return this.http.get('http://localhost:3000/api/auth/re-new-token',{headers: this.getHeaders()})
    }

    
    getHeaders(){
      const token = localStorage.getItem('token') ?? '';
      return new HttpHeaders().set('X-Token', token);
    }


}
