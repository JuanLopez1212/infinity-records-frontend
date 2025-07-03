import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Albums } from './pages/private/albums/albums';
import { UserNewForm } from './pages/private/users/new-form/new-form';
import { Users } from './pages/private/users/users';
import { Events } from './pages/private/events/events';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: 'home', component: Home },
    {path: 'login', component: Login },
    {path: 'register', component: Register },
    {path: 'dashboard', component: Dashboard,canActivate:[authGuard]},
    {path: 'albums', component: Albums ,canActivate:[authGuard]},
    {path:'dashboard/users', component: Users,canActivate:[authGuard]},
    {path: 'dashboard/events/new', component:Events, pathMatch : 'full'},
    {path: 'dashboard/users/new', component: UserNewForm,canActivate:[authGuard]},
    {path: '**', redirectTo: 'home', pathMatch: 'full' },
    {path: '', redirectTo: 'home', pathMatch: 'full' } 
    
];
