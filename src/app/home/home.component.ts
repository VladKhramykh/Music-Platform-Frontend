import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Track} from '../shared/models/track.model';
import {PageEvent} from '@angular/material/paginator';
import {Album} from '../shared/models/album.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  lastReleases: Track[] = [];
  lastAlbums: Album[] = [];
  pageSize = 15;
  pageNum = 0;
  albumPageSize: number = 6;
  albumPageNum: number = 0;
  breakpoint: number;
  pageSizeOptions: number[] = [15, 25, 50];
  albumPageSizeOptions: number[] = [6, 12];
  countOfTracks: number;
  countOfAlbums: number;
  playingTrackId: number;

  constructor(private musicService: MusicService) {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 6;
  }

  ngOnInit(): void {
    this.musicService.getLastAlbumReleases(this.albumPageNum, this.albumPageSize).subscribe(
      data => {
        this.lastAlbums = data.content;
        this.countOfAlbums = data.totalElements;
      }
    );
    this.musicService.getLastTrackReleases(this.pageNum, this.pageSize, 'RELEASEDATE_DESC').subscribe(
      data => {
        this.lastReleases = data.content;
        this.countOfTracks = data.totalElements;
      }
    );
  }

  getLastTrackReleases(event?: PageEvent) {
    this.musicService.getLastTrackReleases(event.pageIndex, event.pageSize, 'RELEASEDATE_DESC').subscribe(
      data => {
        this.lastReleases = data.content;
        this.countOfTracks = data.totalElements;
      }
    );
  }

  getLastAlbumsReleases(event?: PageEvent) {
    this.musicService.getLastAlbumReleases(event.pageIndex, event.pageSize).subscribe(
      data => {
        this.lastAlbums = data.content;
        this.countOfAlbums = data.totalElements;
      }
    );
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 6;
    this.breakpoint = (event.target.innerWidth > 800 && event.target.innerWidth <= 1000) ? 4 : 1;
    this.breakpoint = (event.target.innerWidth > 1000) ? 6 : 4;
  }

  setPlayingTrackId(id: number) {
    this.playingTrackId = id;
  }
}
