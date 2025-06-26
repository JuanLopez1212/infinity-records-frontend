import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Albums {

  constructor( private http: HttpClient) {}

  registerAlbum ( newAlbum: any ) {
    return this.http.post ( 'http://localhost:3000/api/albums', newAlbum ) 
  }

  getAlbums () {
    return this.http.get ( 'http://localhost:3000/api/albums' )
  }
}