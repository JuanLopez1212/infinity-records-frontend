import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  registerUsers (newUsers: any) {
    return this.http.post('http://localhost:3000/api/users', newUsers)
  }

  getUsers () {
    return this.http.get ('http://localhost:3000/api/users');
  }

  
}