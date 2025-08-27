import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthServices } from './auth-services';

@Injectable({
  providedIn: 'root'
})
export class ArtistsServices {
  BASE_URL: string = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private authService: AuthServices
  ) { 
}
  registerArtist(newArtist: any) {
    return this.http.post<any>(`${this.BASE_URL}/artists`, newArtist, { headers: this.authService.getHeaders() });
  }

  getArtists() {
    return this.http.get<any>(`${this.BASE_URL}/artists`);
  }

  getArtistById(id: string) {
    return this.http.get<any>(`${this.BASE_URL}/artists/` + id, { headers: this.authService.getHeaders() });
  }

  getArtistByUserId(userId: string) {
  return this.http.get<any>(`${this.BASE_URL}/artists/user/` + userId, {headers: this.authService.getHeaders()});
}

  deleteArtist(id: string) {
    return this.http.delete<any>(`${this.BASE_URL}/artists/` + id, { headers: this.authService.getHeaders() });
  }

  updateArtist(id: string, updatedArtist: any) {
    return this.http.patch<any>(`${this.BASE_URL}/artists/` + id, updatedArtist, { headers: this.authService.getHeaders() });
  }
}

