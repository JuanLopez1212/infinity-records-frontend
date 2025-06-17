import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor( private http :HttpClient) { }

  getAlbums(){
    this.http.get('http://localhost:3000/api/albums/')
  }
}
