import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Album } from './pages/private/albums/albums';
import { AlbumNewForm } from './pages/private/albums/new-form/new-form';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard/albums', component: Album },
    { path: 'dashboard/albums/new', component: AlbumNewForm },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' } 
];
