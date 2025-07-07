import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth-services';

@Component({
  selector: 'app-header',
  imports: [ RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  
  constructor ( private authService: AuthServices, private router: Router ) {}

  logout () {
    this.authService.deleteLocalStorage ( 'token' );
    this.authService.deleteLocalStorage ( 'userData' );
    this.router.navigateByUrl ( 'home' )  // Esta ruta debe existir
  }
}
