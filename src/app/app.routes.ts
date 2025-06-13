import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Songs } from './pages/private/songs/songs';


export const routes: Routes = [
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'dashboard/songs', component:Songs},
    {path: '**', redirectTo: '', pathMatch: 'full'},
    {path: '',  redirectTo:'home', pathMatch: "full"}

];
