import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {BaseResponseModel} from '../../app/shared/models/base-response.model';
import {Artist} from '../../app/shared/models/artist.model';
import {Track} from '../../app/shared/models/track.model';

const API = {
  SEARCH: 'https://itunes.apple.com/search',
  LOOKUP: 'https://itunes.apple.com/lookup',
  ALBUM: 'http://localhost:8081/api/albums',
  TRACK: 'http://localhost:8081/api/tracks',
  ARTIST: 'http://localhost:8081/api/artists',
};

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private _albums: Array<any> = [];
  private _artistId: number = 0;
  tracksSubject = new Subject;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${API.ARTIST}/${id}`, this.httpOptions);
  }

  getTrackById(id: number): Observable<Track> {
    return this.http.get<Track>(`${API.TRACK}/${id}`, this.httpOptions);
  }

  getAlbumsByArtistId(id: number) {
    return this.http.get<BaseResponseModel>(`${API.ALBUM}/artist?artistId=${id}&albumSort=ID_ASC`, this.httpOptions);
  }

  getTracksByArtistId(id: number, pageSize: number, pageNum: number): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.TRACK}?artistId=${id}&pageSize=10&pageNum=0&trackSort=NAME_ASC`, this.httpOptions);
  }

  getTracksByAlbumId(id: number) {
    return this.http.get<BaseResponseModel>(`${API.TRACK}/album?albumId=${id}&trackSort=ID_ASC`, this.httpOptions);
  }

  // findArtistsByNameContains(param: string): Observable<BaseResponseModel> {
  //   return this.http.get<any>(API.ARTIST + `/search?name=${param}&pageSize=7&pageNum=0&artistSort=NAME_ASC`, this.httpOptions);
  // }
}
