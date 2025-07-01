import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { SongsNewForm } from './pages/private/songs/new-form/new-form';
import { Song } from './pages/private/songs/songs';



export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'dashboard/songs', component:Song},
    {path: 'dashboard/songs/new', component:SongsNewForm},
    {path: '**', redirectTo: '', pathMatch: 'full'},
    {path: '',  redirectTo:'home', pathMatch: "full"}

];
