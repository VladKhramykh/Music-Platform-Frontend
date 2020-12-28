import {Component, OnInit} from '@angular/core';
import {Track} from '../shared/models/track.model';
import {UsersService} from '../../core/services/user.service';
import {NotificationService} from '../../core/services/notification.service';
import {UserModel} from '../shared/models/user.model';
import {MusicService} from '../../core/services/music.service';
import {Album} from '../shared/models/album.model';
import {AuthService} from '../../core/services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {Globals} from "../shared/globals";
import {environment} from "../../environments/environment.prod";

@Component({
  selector: 'app-album-extend',
  templateUrl: './album-extend.component.html',
  styleUrls: ['./album-extend.component.css']
})
export class AlbumExtendComponent implements OnInit {
  tracks: Track[];
  album: Album;
  albumId: number;
  currentUser: UserModel;
  countOfTracks: number;
  albumPhotoUri: string;
  globals: Globals;

  constructor(
    private userService: UsersService,
    private notificationService: NotificationService,
    private musicService: MusicService,
    private router: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.albumId = parseInt(params['id']);
      this.getFullAlbumById(this.albumId);
    });
  }

  getFullAlbumById(id: number) {
    this.musicService.getAlbumById(id).subscribe(
      data => {
        this.album = data;
        if (this.album.photoUri == null || this.album.photoUri.length == 0) {
          this.albumPhotoUri = '/assets/static/imposter.png';
        } else {
          this.albumPhotoUri = `${environment.uploadUrl}img/albums/${this.album.photoUri}`;
        }
        this.currentUser = this.authService.getUser();
      }
    );
    this.getTracksByAlbumId(id);
  }

  getTracksByAlbumId(id: number) {
    this.musicService.getTracksByAlbumId(id).subscribe(
      data => {
        this.tracks = data;
        this.countOfTracks = data.length;
      }
    );
  }

  isLiked(track: Track): boolean {
    return track.likes.findIndex(x => x.id === this.currentUser.id) != -1
  }

  removeFromFavouriteList(track: Track) {
    this.userService.dislikeTrack(track.id).subscribe(
      data => {
        this.notificationService.openSnackBar('This track removed from your favourite list of tracks');
        this.getTracksByAlbumId(this.albumId);
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }

  addToFavouriteList(track: Track) {
    this.userService.likeTrack(track.id).subscribe(
      data => {
        this.notificationService.openSnackBar('This track added to your favourite list of tracks');
        this.getTracksByAlbumId(this.albumId);
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }
}
