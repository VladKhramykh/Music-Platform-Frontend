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

const routes: Routes = [
  {path: 'profile', component: ProfileComponent},
  {path: 'favourite', component: FavouriteListComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: ':id/:name', component: AlbumComponent},
  {path: ':id/:name/:colllection_id/:collection_name', component: TracksComponent},
  {path: '***', component: HomeComponent},

];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule {
}
