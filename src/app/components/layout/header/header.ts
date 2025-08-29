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

  // Control de submenús
  openSubmenu: string | null = null;

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
    this.openSubmenu = null; // cerrar submenús al abrir/cerrar menú
  }

  toggleSubmenu(menu: string, event: Event) {
    event.preventDefault(); // evitar navegación
    this.openSubmenu = this.openSubmenu === menu ? null : menu;
  }

  logout () {
    this.authService.logout();
    this.router.navigateByUrl('home');
  }
}
  