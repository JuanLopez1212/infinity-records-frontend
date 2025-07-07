import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { Register } from './pages/public/register/register';
import { Album } from './pages/private/albums/albums';
import { AlbumNewForm } from './pages/private/albums/new-form/new-form';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { UserNewForm } from './pages/private/users/new-form/new-form';
import { Users } from './pages/private/users/users';
import { Events } from './pages/private/events/events';

import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [ authGuard ] },
    { path: 'dashboard/users', component: Users,canActivate:[authGuard]},
    { path: 'dashboard/albums', component: Album, canActivate: [ authGuard ] },
    { path: 'dashboard/events/new', component:Events, pathMatch : 'full'},
    { path: 'dashboard/users/new', component: UserNewForm,canActivate:[authGuard]},
    { path: 'dashboard/albums/new', component: AlbumNewForm, canActivate: [ authGuard ] },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' } 

];
