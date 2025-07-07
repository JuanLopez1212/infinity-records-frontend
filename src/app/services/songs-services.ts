import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SongsServices {

    constructor(private http: HttpClient){}

    registerSongs(newSongs:any){
       return this.http.post ('http://localhost:3000/api/songs', newSongs)
    }

    getSongs(){
     return this.http.get('http://localhost:3000/api/songs', )
    }


}

