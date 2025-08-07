import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

BASE_URL: string = environment.apiUrl;

  constructor( private http: HttpClient) {

   }

  getUsers () {
    return this.http.get ( `${this.BASE_URL}/users` )
  }

  getArtists () {
    return this.http.get ( `${this.BASE_URL}/users/role/artist` )
  }

}
