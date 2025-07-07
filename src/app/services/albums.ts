import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';

@Injectable({
  providedIn: 'root'
})
export class Albums {

  constructor( 
    private http: HttpClient,
    private authService: AuthServices
  ) {}

  registerAlbum ( newAlbum: any ) {
    return this.http.post ( 'http://localhost:3000/api/albums', newAlbum, { headers: this.authService.getHeaders() } ) 
  }

  getAlbums () {
    return this.http.get ( 'http://localhost:3000/api/albums' )
  }
}