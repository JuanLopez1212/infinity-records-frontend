import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../services/auth-services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [ RouterLink, CommonModule ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  user: any = null;
  userLogged!: any; 

  // Estado del menú hamburguesa
  menuOpen: boolean = false;

  constructor ( private authService: AuthServices, private router: Router ) {
    this.user = this.authService.getCurrentUser();
  }

  ngOnInit() {
    this.authService.user$.subscribe( userLogged => {
      this.userLogged = userLogged;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout () {
    this.authService.logout();
    this.router.navigateByUrl('home');
  }
}


