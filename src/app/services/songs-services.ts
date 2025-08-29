import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SongsInterface } from '../interfaces/songs-interface';

@Injectable({
  providedIn: 'root'
})
export class SongsServices {

BASE_URL: string = environment.apiUrl;

    constructor(
      private http: HttpClient,
      private authServices: AuthServices
    ){
    }

    registerSongs(newSongs:SongsInterface): Observable <SongsInterface>{
       return this.http.post <SongsInterface>(`${this.BASE_URL}/songs`, newSongs, { headers: this.authServices.getHeaders() });
    }

    getSongs():Observable <SongsInterface[]>{
     return this.http.get<SongsInterface[]>(`${this.BASE_URL}/songs` )
    }

    getSongsbyId(id:string) :Observable <SongsInterface>{
       return this.http.get<SongsInterface>(`${this.BASE_URL}/songs/`+ id , { headers: this.authServices.getHeaders() } )
    }

    getSongsByArtistId( userId: string ) {
    return this.http.get<any> ( `${this.BASE_URL}/songs/users/` + userId, { headers: this.authServices.getHeaders()})
  }
    
  getPublicSongsByArtistId(userId: string) {
    // Sin headers de autenticación  
    return this.http.get<any>(`${this.BASE_URL}/songs/users/` + userId);
  }

    deleteSongs(id: string) :Observable<SongsInterface>{
      return this.http.delete<SongsInterface>(`${this.BASE_URL}/songs/` + id, { headers: this.authServices.getHeaders() }  )
    }

    updateSongs (id: string , updateSongs : SongsInterface) :Observable<SongsInterface>{
      return this.http.patch<SongsInterface>(`${this.BASE_URL}/songs/`+ id , updateSongs,  { headers: this.authServices.getHeaders() } )
    }


}

