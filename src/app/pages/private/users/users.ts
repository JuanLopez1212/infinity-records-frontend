import { Component } from '@angular/core';
import { UsersService } from '../../../services/users';


@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  constructor (private usersService: UsersService) {}

  //usamos este ciclo de vida para obtener los datos en el momento en el que inicializa el componente 
  ngOnInit () {
    this.usersService.getUsers().subscribe({
      next: (data) => {
        console.log(data);
      },
      error:(error) => {
        console.error(error);
      },
      complete: () => {}
    });
  }
}
