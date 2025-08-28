import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Albums {
  BASE_URL: string = environment.apiUrl;

  constructor( 
    private http: HttpClient,
    private authService: AuthServices
    
  ) {
    
  }

  registerAlbum ( newAlbum: any ) {
    return this.http.post<any> ( `${this.BASE_URL}/albums`, newAlbum, { headers: this.authService.getHeaders() } ) 
  }

  getAlbums () {
    return this.http.get<any> ( `${this.BASE_URL}/albums` )
  }

  getAlbumById ( id: string ) {
    return this.http.get<any> ( `${this.BASE_URL}/albums/` + id, { headers: this.authService.getHeaders() } )
  }
  
  getPublicAlbumsByArtistId(userId: string) {
    return this.http.get<any>(`${this.BASE_URL}/albums/users/` + userId);
  }

  getAlbumByArtistId( userId: string ) {
    return this.http.get<any> ( `${this.BASE_URL}/albums/users/` + userId, { headers: this.authService.getHeaders()})
  }

  deleteAlbum ( id: string ) {
    return this.http.delete<any> ( `${this.BASE_URL}/albums/` + id, { headers: this.authService.getHeaders() } )
  }

  updateAlbum ( id: string, updatedAlbum: any ) {
    return this.http.patch<any> ( `${this.BASE_URL}/albums/` + id, updatedAlbum, { headers: this.authService.getHeaders() } )
  }
}