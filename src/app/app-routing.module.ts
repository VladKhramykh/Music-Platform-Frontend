import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AlbumComponent} from './album/album.component';
import {TracksComponent} from './tracks/tracks.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {FavouriteListComponent} from './favourite-list/favourite-list.component';
import {ArtistComponent} from './artist/artist.component';
import {AuthGuard} from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'favourite',
    component: FavouriteListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'artist/:id',
    component: ArtistComponent
  },
  {
    path: 'album/:id',
    component: AlbumComponent
  },
  {
    path: ':id/:name/:colllection_id/:collection_name',
    component: TracksComponent
  },
  {
    path: '***',
    redirectTo: '/home'
  },


];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {
}
