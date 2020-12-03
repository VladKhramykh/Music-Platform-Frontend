import {Component, Input, OnInit} from '@angular/core';
import {MusicService} from '../../core/services/music.service';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
})
export class ArtistComponent implements OnInit {
  @Input()
  set searchKey(key: string) {
    this.search(key);
  }

  searchResults: Array<any> = [];
  artistID: number = 0;
  selectedArtist: string;

  constructor(private musicService: MusicService) {
  }

  ngOnInit() {
  }

  search(param) {
    this.musicService.search(param).subscribe(
      data => {
        this.searchResults = data['results'];
      },
      err => console.log(err)
    );
  }

  getAlbums(artistId: number, artistName: string) {
    this.artistID = artistId;
    this.selectedArtist = artistName;
  }
}
