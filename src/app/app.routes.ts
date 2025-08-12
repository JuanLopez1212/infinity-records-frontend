import { Routes } from '@angular/router';
import { Home } from './pages/public/home/home';
import { Login } from './pages/public/login/login';
import { NewRegister } from './pages/public/new-register/new-register';
import { Album } from './pages/private/albums/albums';
import { AlbumNewForm } from './pages/private/albums/new-form/new-form';
import { Dashboard } from './pages/private/dashboard/dashboard';
import { UserNewForm } from './pages/private/users/new-form/new-form';
import { Users } from './pages/private/users/users';
import { Events } from './pages/private/events/events';
import { SongsNewForm } from './pages/private/songs/new-form/new-form';
import { Song } from './pages/private/songs/songs';

import { authGuard } from './guards/auth-guard';
import { SongEdit } from './pages/private/songs/song-edit/song-edit';
import { EventNew } from './pages/private/events/event-new/event-new';
import { EventEdit } from './pages/private/events/event-edit/event-edit';
import { AlbumEdit } from './pages/private/albums/album-edit/album-edit';
import { adminGuard } from './guards/admin-guard';

import { EventsComponent } from './pages/public/events-public/events-component';


import { ArtistsPublic } from './pages/public/artists-public/artists-public';
import { AlbumsPublic } from './pages/public/albums-public/albums-public';
import { SliderComponent } from './pages/public/slider.component/slider.component';
import { SongsPublic } from './pages/public/songs-public/songs-public';
import { Artists } from './pages/private/artists/artists';



export const routes: Routes = [
    { path: 'home', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: NewRegister },
    { path: 'dashboard', component: Dashboard, canActivate: [ authGuard ] },
    { path: 'artists', component: ArtistsPublic},
    { path: 'albums', component: AlbumsPublic},
    { path: 'songs', component: SongsPublic},
    {path: 'artistsp', component: Artists},
    {
        path: 'dashboard/users',
        component: Users,
        canActivate: [authGuard, adminGuard],
        data: { expectedRoles: ['admin'] }
    },
    { path: 'dashboard/albums', component: Album, canActivate: [ authGuard ] },
    { path: 'dashboard/songs', component:Song ,canActivate:[authGuard] },
    { path: 'dashboard/events', component: Events, canActivate:[authGuard] },
    { path: 'dashboard/events/new', component: EventNew, canActivate:[authGuard] },
    { path: 'events', component: EventsComponent},
    {path:'slider',component:SliderComponent},
    { 
        path: 'dashboard/songs/new', 
        component:SongsNewForm, 
        canActivate:[authGuard, adminGuard ],
        data: { expectedRoles: ['admin', 'artists'] }
    },
    { path: 'dashboard/users/new', component: UserNewForm,canActivate:[authGuard]},
    { path: 'dashboard/albums/new', component: AlbumNewForm, canActivate: [ authGuard ] },
    { path: 'dashboard/events/edit/:id', component: EventEdit, canActivate: [authGuard]},
    { path: 'dashboard/albums/edit/:id', component: AlbumEdit, canActivate: [authGuard]},
    { path: 'dashboard/songs/edit/:id', component:SongEdit, canActivate:[authGuard]},
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' } 
];
