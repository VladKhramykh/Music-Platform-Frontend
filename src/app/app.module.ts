import {BrowserModule} from '@angular/platform-browser';
import {Compiler, NgModule} from '@angular/core';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';

import {AppComponent} from './app.component';
import {ArtistComponent} from './artist/artist.component';
import {AlbumComponent} from './album/album.component';
import {TrackComponent} from './track/track.component';
import {PlayerComponent} from './player/player.component';
import {TrackControlComponent} from './track/track-control/track-control.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {TracksComponent} from './tracks/tracks.component';
import {ProfileComponent} from './profile/profile.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FavouriteListComponent} from './favourite-list/favourite-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {SearchComponent} from './search/search.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import {AdminPanelComponent} from './admin-panel/admin-panel.component';
import {CategoriesDatagridComponent} from './admin-panel/categories-datagrid/categories-datagrid.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CategoryDialogboxComponent} from './admin-panel/category-dialogbox/category-dialogbox.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ArtistsDatagridComponent} from './admin-panel/artists-datagrid/artists-datagrid.component';
import {ArtistDialogboxComponent} from './admin-panel/artist-dialogbox/artist-dialogbox.component';
import {AlbumDialogboxComponent} from './admin-panel/album-dialogbox/album-dialogbox.component';
import {AlbumDatagridComponent} from './admin-panel/album-datagrid/album-datagrid.component';
import {MatChipsModule} from '@angular/material/chips';
import { TrackDatagridComponent } from './admin-panel/track-datagrid/track-datagrid.component';
import { TrackDialogboxComponent } from './admin-panel/track-dialogbox/track-dialogbox.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    AlbumComponent,
    TrackComponent,
    PlayerComponent,
    TrackControlComponent,
    HomeComponent,
    TracksComponent,
    ProfileComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    FooterComponent,
    FavouriteListComponent,
    SearchComponent,
    AdminPanelComponent,
    CategoriesDatagridComponent,
    CategoryDialogboxComponent,
    ArtistsDatagridComponent,
    ArtistDialogboxComponent,
    AlbumDatagridComponent,
    AlbumDialogboxComponent,
    TrackDatagridComponent,
    TrackDialogboxComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatListModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatCheckboxModule,
    AppRoutingModule,
    MatCardModule,
    MatRippleModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatButtonModule,
    MatSidenavModule,
    CommonModule,
    MatDatepickerModule,
    MatGridListModule,
    MatTabsModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatChipsModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSidenavModule,
  ],
  providers: [
    Compiler
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
