import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Track} from '../shared/models/track.model';
import {UsersService} from '../../core/services/user.service';
import {NotificationService} from '../../core/services/notification.service';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';
import {Globals} from '../shared/globals';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  displayedColumns: string[] = ['trackCensoredName'];
  track: Track;
  currentUser: UserModel;
  isLiked: boolean;
  trackPhotoUri: string;
  styleForCardImage: string;
  styleForCardHeaderImage: string;

  @Input()
  set trackProp(track: Track) {
    this.track = track;
  }

  constructor(private musicService: MusicService,
              private usersService: UsersService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private globals: Globals) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.isLiked = this.track.likes.findIndex(u => this.currentUser.id === u.id) != -1;
    if(this.track.photoUri == null) {
      this.styleForCardImage = "background-image: url('/assets/static/imposter.png');";
    } else {
      this.styleForCardImage = "background-image: url('http://localhost:8081/img/tracks/" + this.track.photoUri + "');";
    }
    if(this.track.artists[0].photoUri == null) {
      this.styleForCardHeaderImage = "background-image: url('/assets/static/imposter.png');";
    } else {
      this.styleForCardHeaderImage = "background-image: url('http://localhost:8081/img/artists/" + this.track.artists[0].photoUri + "');";
    }
  }

  likeButtonClickHandler(id: number): void {
    this.isLiked ? this.dislike(id) : this.like(id);
  }

  like(id: number) {
    this.usersService.likeTrack(id).subscribe(
      data => {
        this.isLiked = true;
        this.notificationService.openSnackBar('This track added to your favourite list of tracks');
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }

  dislike(id: number) {
    this.usersService.dislikeTrack(id).subscribe(
      data => {
        this.isLiked = false;
        this.notificationService.openSnackBar('This track removed to your favourite list of tracks');
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }
}
