import {Component, OnInit} from '@angular/core';
import {MusicService} from "../../core/services/music.service";
import {Track} from "../shared/models/track.model";
import {UserModel} from "../shared/models/user.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  color: 'lightgreen';
  lastReleases: Track[] = [];
  text: 'valera';
  pageSize = 1;
  pageNum = 0;
  breakpoint: number;
  currentUser: UserModel;
  pageSizeOptions: number[] = [1, 2, 10, 100];
  countOfTracks: number;

  constructor(private musicService: MusicService) {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 6;
  }

  ngOnInit(): void {
    this.musicService.getLastReleases(this.pageNum, this.pageSize, "NAME_DESC").subscribe(
      data => {
        this.lastReleases = data.content;
        this.countOfTracks = data.totalElements;
      }
    )
  }

  getLastRecords(event?:PageEvent) {
    this.musicService.getLastReleases(event.pageIndex, event.pageSize, "NAME_DESC").subscribe(
      data => {
        this.lastReleases = data.content;
        this.countOfTracks = data.totalElements;
      }
    )
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 6;
    this.breakpoint = (event.target.innerWidth > 800 && event.target.innerWidth <= 1000) ? 4 : 1;
    this.breakpoint = (event.target.innerWidth > 1000) ? 6 : 4;
  }
}
