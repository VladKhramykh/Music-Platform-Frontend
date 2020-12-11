import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Track} from '../shared/models/track.model';
import {UsersService} from '../../core/services/user.service';
import {NotificationService} from '../../core/services/notification.service';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss'],
})
export class TrackComponent implements OnInit {
  displayedColumns: string[] = ['trackCensoredName'];
  track: Track;
  currentUser: UserModel;


  @Input()
  set trackProp(track: Track) {
    this.track = track;
  }

  constructor(private musicService: MusicService,
              private usersService: UsersService,
              private notificationService: NotificationService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

  getTrack(trackId: number) {
    this.musicService.getTrackById(trackId).subscribe(result => {
      this.track = result;
    });
  }

  like(id: number) {
    this.usersService.likeTrack(id).subscribe(
      data => {
        this.notificationService.openSnackBar('OK');
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }
}
