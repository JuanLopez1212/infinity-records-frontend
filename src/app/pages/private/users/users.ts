import { Component } from '@angular/core';
import { UsersService } from '../../../services/users';

interface User {
  id?: string
  _id?: string 
  name: string 
  email: string 
  role: string 
}

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  users: User[] = []

  constructor (private usersService: UsersService) {}

  //usamos este ciclo de vida para obtener los datos en el momento en el que inicializa el componente 
  ngOnInit () {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        this.users = data 
        console.log(data);
      },
      error:(error) => {
        console.error(error);
      },
      complete: () => {}
    });
  }
}
