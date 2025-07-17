import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ RouterLink, CommonModule ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  user: any = null;
  userLogged!: any; 
  
  constructor ( private authService: AuthServices, private router: Router ) {
    this.user = this.authService.getCurrentUser()
  }

  ngOnInit() {
    this.authService.user$.subscribe( userLogged => {
      this.userLogged = userLogged;
    });
  }

  logout () {
    this.authService.logout();
    // console.log(this.user)
    // this.authService.deleteLocalStorage ( 'token' )
    // this.authService.deleteLocalStorage ( 'user' )
    this.router.navigateByUrl ( 'home' )
  }
}
