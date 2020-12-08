import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Track} from '../shared/models/track.model';
import {UsersService} from '../../core/services/user.service';
import {NotificationService} from '../../core/services/notification.service';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {UserModel} from '../shared/models/user.model';

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
    track.trackUri = 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview113/v4/b7/3c/31/b73c31e5-acc1-7917-c6a5-45920540bc06/mzaf_4210985984464550990.plus.aac.p.m4a';
    // this.getTrack(trackId);
  }

  constructor(private musicService: MusicService,
              private usersService: UsersService,
              private notificationService: NotificationService,
              private sessionStorageService: SessionStorageService) {
  }

  ngOnInit() {
    this.currentUser = this.sessionStorageService.getUser();
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
