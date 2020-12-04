import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';

const API = {
  SEARCH: 'https://itunes.apple.com/search?',
  LOOKUP: 'https://itunes.apple.com/lookup?',
  ALBUM: 'http://localhost:80801/api/albums?'
};

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private _albums: Array<any> = [];
  private _artistId: number = 0;
  tracksSubject = new Subject;

  constructor(private http: HttpClient) {}

  search(param) {
    return this.http.jsonp(
      `${
        API.SEARCH
      }callback=JSONP_CALLBACK&media=music&country=US&entity=musicArtist&term=${param}`,
      'jsonp'
    );
  }

  getAlbum(artistId: number) {
    return this.http
      .jsonp(
        `${API.LOOKUP}callback=JSONP_CALLBACK&entity=album&id=${artistId}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          return data['results'].filter(
            results => results['wrapperType'] == 'collection'
          );
        })
      );
  }

  getTracks(albumID: number) {
    return this.http
      .jsonp(
        `${API.LOOKUP}callback=JSONP_CALLBACK&entity=song&id=${albumID}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          return data['results'];
        })
      );
  }

  getArtists(nameContains: string) {
    return this.http
      .jsonp(
        `${API.ALBUM}name=${nameContains}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          return data['results'];
        })
      );
  }
}
