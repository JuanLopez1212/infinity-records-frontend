import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersServices {

  constructor( private http: HttpClient) { }

  getUsers () {
    return this.http.get ( 'http://localhost:3000/api/users' )
  }

  getArtists () {
    return this.http.get ( 'http://localhost:3000/api/users/role/artist' )
  }

}
