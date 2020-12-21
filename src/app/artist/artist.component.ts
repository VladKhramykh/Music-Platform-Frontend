import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Artist} from '../shared/models/artist.model';
import {Track} from '../shared/models/track.model';
import {Album} from '../shared/models/album.model';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';
import {PageEvent} from "@angular/material/paginator";
import {Globals} from "../shared/globals";
import {environment} from "../../environments/environment.prod";

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  artist: Artist;
  currentUser: UserModel;
  artistId: number;
  tracks: Track[] = [];
  albums: Album[] = [];
  breakpoint: number;

  pageSize = 1;
  pageNum = 0;
  pageSizeOptions: number[] = [10, 20, 25];
  pageEvent: PageEvent;
  countOfTracks: number;
  artistPhotoUri: string;


  constructor(private musicService: MusicService,
              private router: ActivatedRoute,
              private authService: AuthService,
              private globals: Globals
  ) {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 6;
  }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.router.params.subscribe(params => {
      this.artistId = parseInt(params['id']);
    });
    // TODO fix this call: change on prop which passed to here
    this.search();
    this.getAlbums();
    this.musicService.getTracksByArtistId(this.artistId, this.pageSize, this.pageNum).subscribe(data => {
      this.tracks = data.content;
      this.countOfTracks = data.totalElements;
    });
  }

  search() {
    this.musicService.getArtistById(this.artistId).subscribe(data => {
        this.artist = {
          id: data.id,
          name: data.name,
          description: data.description,
          createdDate: data.createdDate,
          likes: data.likes,
          photoUri: data.photoUri
        };
        this.artistPhotoUri = `${environment.uploadUrl}img/artists/${this.artist.photoUri}`;
      },
      err => console.log(err)
    );
  }

  getAlbums() {
    this.musicService.getAlbumsByArtistId(this.artistId).subscribe(data => {
      this.albums = data;
    });
  }
  // TODO fix this one
  getLastTracks(event?:PageEvent) {
    this.musicService.getTracksByArtistId(this.artistId, event.pageSize, event.pageIndex).subscribe(data => {
      this.tracks = data.content;
      this.countOfTracks = data.totalElements;
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 6;
    this.breakpoint = (event.target.innerWidth > 800 && event.target.innerWidth <= 1000) ? 4 : 1;
    this.breakpoint = (event.target.innerWidth > 1000) ? 6 : 4;
  }
}
