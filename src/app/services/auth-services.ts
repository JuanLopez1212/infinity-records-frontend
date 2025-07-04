import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServices {

  constructor(private http: HttpClient) { }

  loginUser (credentials: any ){
    return this.http.post('http://localhost:3000/api/auth/login', credentials);
  }

  saveLocalStorage(KEY: String, value: any ) {
    localStorage.setItem('token',value);
  }

  deleteLocalStorage(key: string){
    localStorage.removeItem(key);
  }

  veryfyAuthenticateUser () {
  return this.http.get('http://localhost:3000/api/auth/re-new-token',{headers: this.getHeaders() })
  .pipe(
    map((data:any) => {
      console.log('service',data);

      return data.token;
    }),
    catchError(() => {
      return of (false);
    })
  );



    // return this.http.get('http://localhost:3000/api/auth/re-new-token',{headers: this.getHeaders() })
    //             .pipe(
    //               tap( (data) => {
    //                 console.log(data)

    //                 return data;
    //               }),
    //               map((newData: any) => {
    //                 return newData.token.length;
    //               }),
    //               catchError(() => {
    //                 return of(false);
    //               })
    //             );
  }

  getHeaders() {
    const token =localStorage.getItem('token') ?? '';
    return new HttpHeaders(). set('X-Token' , token);
  }
};
