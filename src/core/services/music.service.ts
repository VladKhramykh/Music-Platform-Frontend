import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

const API = {
  SEARCH: 'https://itunes.apple.com/search?',
  LOOKUP: 'https://itunes.apple.com/lookup?',
  ALBUM: 'http://localhost:8081/api/albums?',
  TRACK: 'http://localhost:8081/api/tracks?',
  ARTIST: 'http://localhost:8081/api/artists?',
};

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private _albums: Array<any> = [];
  private _artistId: number = 0;
  tracksSubject = new Subject;

  constructor(private http: HttpClient) {
  }

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
        `${API.ARTIST}name=${nameContains}&pageSize=15&pageNum=0`,
        'jsonp'
      )
      .pipe(
        map(data => {
          return data['results'];
        })
      );
  }

  getArtistById(id: number) {
    return this.http
      .jsonp(
        `${API.ARTIST}${id}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          return data['results'];
        })
      );
  }

  getAlbumsByArtistId(id: number) {
    return this.http
      .jsonp(
        `${API.ALBUM}artistId=${id}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          console.log(data);
          return data['results'];
        })
      );
  }

  getTracksByArtistId(id: number) {
    return this.http
      .jsonp(
        `${API.TRACK}artistId=${id}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          console.log(data);
          return data['results'];
        })
      );
  }

  getTracksByAlbumId(id: number) {
    return this.http
      .jsonp(
        `${API.TRACK}albumId=${id}`,
        'jsonp'
      )
      .pipe(
        map(data => {
          console.log(data);
          return data['results'];
        })
      );
  }
}
