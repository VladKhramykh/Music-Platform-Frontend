import {Component, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';
import {Artist} from '../shared/models/artist.model';
import {Track} from '../shared/models/track.model';
import {Album} from '../shared/models/album.model';
import {ActivatedRoute} from '@angular/router';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';

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
    this.search();
    this.getAlbums();
    this.getTracks(10, 0);
  }

  search() {
    this.musicService.getArtistById(this.artistId).subscribe(data => {
        this.artist = {
          id: data.id,
          name: data.name,
          description: data.description,
          createdDate: data.createdDate,
          likes: data.likes
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
      this.albums = data.content;
    });
  }

  getTracks(pageSize: number, pageNum: number) {
    this.musicService.getTracksByArtistId(this.artistId, pageSize, pageNum).subscribe(data => {
      this.tracks = data.content;
    });
  }
}
