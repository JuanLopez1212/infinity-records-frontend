import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) { }

  registerUsers (newUsers: any) {
    return this.http.post('http://localhost:3000/api/users', newUsers)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]> ('http://localhost:3000/api/users');
  }

  
}