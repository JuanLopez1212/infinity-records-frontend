import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
BASE_URL: string = environment.apiUrl;

  constructor(private http: HttpClient) { 
  }

  registerUsers (newUsers: any) {
    return this.http.post(`${this.BASE_URL}/users`, newUsers)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]> (`${this.BASE_URL}/users`);
  }

  
}