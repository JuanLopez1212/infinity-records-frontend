import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth-services';

@Component({
  selector: 'app-header',
  imports: [ RouterLink ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  user: any = null
  
  constructor ( private authService: AuthServices, private router: Router ) {
    this.user = this.authService.getCurrentUser()
  }

  logout () {
    console.log(this.user)
    this.authService.deleteLocalStorage ( 'token' )
    this.authService.deleteLocalStorage ( 'user' )
    this.router.navigateByUrl ( 'home' )
  }
}
