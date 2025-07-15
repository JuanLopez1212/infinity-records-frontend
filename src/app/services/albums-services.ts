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
    return this.http.post<any> ( 'http://localhost:3000/api/albums', newAlbum, { headers: this.authService.getHeaders() } ) 
  }

  getAlbums () {
    return this.http.get<any> ( 'http://localhost:3000/api/albums' )
  }

  getAlbumById ( id: string ) {
    return this.http.get<any> ( 'http://localhost:3000/api/albums/' + id, { headers: this.authService.getHeaders() } )
  }

  deleteAlbum ( id: string ) {
    return this.http.delete<any> ( 'http://localhost:3000/api/albums/' + id, { headers: this.authService.getHeaders() } )
  }

  updateAlbum ( id: string, updatedAlbum: any ) {
    return this.http.patch<any> ( 'http://localhost:3000/api/albums/' + id, updatedAlbum, { headers: this.authService.getHeaders() } )
  }
}