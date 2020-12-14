import { Component, OnInit } from '@angular/core';
import {Track} from "../shared/models/track.model";
import {MusicService} from "../../core/services/music.service";
import {UserModel} from "../shared/models/user.model";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-favourite-list',
  templateUrl: './favourite-list.component.html',
  styleUrls: ['./favourite-list.component.css']
})
export class FavouriteListComponent implements OnInit {

  tracks: Track[] = [];

  pageSize = 1;
  pageNum = 0;
  breakpoint: number;
  currentUser: UserModel;
  pageSizeOptions: number[] = [1, 2, 10, 100];
  pageEvent: PageEvent;
  countOfTracks: number;

  constructor(
    private musicService: MusicService
  ) { }

  ngOnInit(): void {
    this.musicService.getFavouriteTracksByPage(this.pageNum, this.pageSize, "NAME_DESC").subscribe(
      data => {
        this.tracks = data.content;
        this.countOfTracks = data.totalElements;
      }
    )
  }

  getFavouriteTracks(event?:PageEvent) {
    this.musicService.getLastReleases(event.pageIndex, event.pageSize, "NAME_DESC").subscribe(
      data => {
        this.tracks = data.content;
        this.countOfTracks = data.totalElements;
      }
    )
  }

}
