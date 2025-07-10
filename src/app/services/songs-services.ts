import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthServices } from './auth-services';
import { catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongsServices {

    constructor(
      private http: HttpClient,
      private authServices: AuthServices
    ){}

    registerSongs(newSongs:any){
       return this.http.post <any>('http://localhost:3000/api/songs', newSongs, { headers: this.authServices.getHeaders() });
    }

    getSongs(){
     return this.http.get<any>('http://localhost:3000/api/songs' )
    }

    getSongsbyId(id:string){
       return this.http.get<any>('http://localhost:3000/api/songs/'+ id , { headers: this.authServices.getHeaders() } )
    }
    

    deleteSongs(id: string){
      return this.http.delete<any>('http://localhost:3000/api/songs/' + id, { headers: this.authServices.getHeaders() }  )
    }

    updateSongs (id: string , updateSongs : any){
      return this.http.patch<any>('http://localhost:3000/api/songs/'+ id , updateSongs,  { headers: this.authServices.getHeaders() } )
    }


}

