import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Artist} from '../shared/models/artist.model';
import {Track} from '../shared/models/track.model';
import {Album} from '../shared/models/album.model';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';
import {PageEvent} from "@angular/material/paginator";

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

  pageSize = 1;
  pageNum = 0;
  pageSizeOptions: number[] = [1, 2, 10, 100];
  pageEvent: PageEvent;
  countOfTracks: number;


  constructor(private musicService: MusicService,
              private router: ActivatedRoute,
              private authService: AuthService
  ) {
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
      },
      err => console.log(err)
    );
  }

  getTracksByAlbum(albumId: number) {
    this.musicService.getTracksByAlbumId(albumId).subscribe(data => {

    });
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
}
