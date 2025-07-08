import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';

@Injectable({
  providedIn: 'root'
})
export class SongsServices {

    constructor(
      private http: HttpClient,
      private authServices: AuthServices
    ){}

    registerSongs(newSongs:any){
       return this.http.post ('http://localhost:3000/api/songs', newSongs, { headers: this.authServices.getHeaders() });
    }

    getSongs(){
     return this.http.get('http://localhost:3000/api/songs', )
    }


}

