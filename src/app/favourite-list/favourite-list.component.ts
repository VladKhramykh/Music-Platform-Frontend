import {Component, OnInit} from '@angular/core';
import {Track} from '../shared/models/track.model';
import {MusicService} from '../../core/services/music.service';
import {UserModel} from '../shared/models/user.model';
import {PageEvent} from '@angular/material/paginator';
import {UsersService} from '../../core/services/user.service';
import {NotificationService} from '../../core/services/notification.service';
import {Album} from '../shared/models/album.model';

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {

  tracks: Track[] = [];
  favouriteAlbums: Album[] = [];

  pageSize = 15;
  albumPageSize = 15;
  pageNum = 0;
  albumPageNum = 0;
  breakpoint: number;
  currentUser: UserModel;
  pageSizeOptions: number[] = [15, 25, 50];
  countOfTracks: number;
  countOfAlbums: number;

  constructor(
    private musicService: MusicService,
    private userService: UsersService,
    private notificationService: NotificationService
  ) {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 6;
  }

  ngOnInit(): void {
    this.musicService.getFavouriteTracksByPage(this.pageNum, this.pageSize, 'NAME_DESC').subscribe(
      data => {
        this.tracks = data.content;
        this.countOfTracks = data.totalElements;
      }
    );

    this.musicService.getFavouriteAlbums(this.albumPageNum, this.albumPageSize, 'NAME_DESC').subscribe(
      data => {
        this.favouriteAlbums = data.content;
        this.countOfAlbums = data.totalElements;
      }
    );
  }

  getFavouriteTracks(event?: PageEvent) {
    this.musicService.getFavouriteTracksByPage(event.pageIndex, event.pageSize, 'NAME_DESC').subscribe(
      data => {
        this.tracks = data.content;
        this.countOfTracks = data.totalElements;
      }
    );
  }

  likeButtonClickHandler(track: Track) {
    if (track.likes.includes(this.currentUser)) {
      this.removeFromFavouriteList(track);
    } else {
      this.addToFavouriteList(track);
    }
  }

  removeFromFavouriteList(track: Track) {
    this.userService.dislikeTrack(track.id).subscribe(
      data => {
        this.notificationService.openSnackBar('This track removed to your favourite list of tracks');
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
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 6;
    this.breakpoint = (event.target.innerWidth > 800 && event.target.innerWidth <= 1000) ? 4 : 1;
    this.breakpoint = (event.target.innerWidth > 1000) ? 6 : 4;
  }
}
