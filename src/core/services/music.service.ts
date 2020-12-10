import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseResponseModel} from '../../app/shared/models/base-response.model';
import {Artist} from '../../app/shared/models/artist.model';
import {Track} from '../../app/shared/models/track.model';
import {Category} from '../../app/shared/models/category.model';
import {Album} from '../../app/shared/models/album.model';

const API = {
  SEARCH: 'https://itunes.apple.com/search',
  LOOKUP: 'https://itunes.apple.com/lookup',
  ALBUM: 'http://localhost:8081/api/albums',
  TRACK: 'http://localhost:8081/api/tracks',
  ARTIST: 'http://localhost:8081/api/artists',
  CATEGORIES: 'http://localhost:8081/api/categories',
};

@Injectable({
  providedIn: 'root',
})
export class MusicService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${API.ARTIST}/${id}`, this.httpOptions);
  }

  getCategoriesByPage(pageNum: number, pageSize: number, filterValue: string, sort: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.CATEGORIES}?pageNum=${pageNum}&pageSize=${pageSize}&categorySort=${sort.toUpperCase()}`, this.httpOptions);
  }

  getArtistsByPage(pageNum: number, pageSize: number, filterValue: string, sort: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.ARTIST}?pageNum=${pageNum}&pageSize=${pageSize}&artistSort=${sort.toUpperCase()}`, this.httpOptions);
  }

  getAlbumsByPage(pageNum: number, pageSize: number, filterValue: string, sort: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.ALBUM}?pageNum=${pageNum}&pageSize=${pageSize}&albumSort=${sort.toUpperCase()}`, this.httpOptions);
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

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${API.CATEGORIES}`, category, this.httpOptions);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${API.CATEGORIES}`, category, this.httpOptions);
  }

  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(`${API.CATEGORIES}/${id}`, this.httpOptions);
  }

  addArtist(artist: Artist): Observable<Artist> {
    return this.http.post<Artist>(`${API.ARTIST}`, artist, this.httpOptions);
  }

  updateArtist(artist: Artist): Observable<Artist> {
    return this.http.put<Artist>(`${API.ARTIST}`, artist, this.httpOptions);
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.http.delete<Artist>(`${API.ARTIST}/${id}`, this.httpOptions);
  }

  addAlbum(album: Album): Observable<Album> {
    return this.http.post<Album>(`${API.ALBUM}`, album, this.httpOptions);
  }

  updateAlbum(album: Album): Observable<Album> {
    return this.http.put<Album>(`${API.ALBUM}`, album, this.httpOptions);
  }

  deleteAlbum(id: number): Observable<Album> {
    return this.http.delete<Album>(`${API.ALBUM}/${id}`, this.httpOptions);
  }

  getAlbumTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${API.ALBUM}/types`, this.httpOptions);
  }

  getCategories():Observable<Category[]> {
    return this.http.get<Category[]>(`${API.CATEGORIES}`, this.httpOptions);
  }

  getTracksByPage(pageNum: number, pageSize: number, filterValue: string, sort: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.TRACK}?pageNum=${pageNum}&pageSize=${pageSize}&trackSort=${sort.toUpperCase()}`, this.httpOptions);
  }

  addTrack(track: Track) {
    return this.http.post<Track>(`${API.TRACK}`, track, this.httpOptions);
  }

  updateTrack(track: Track): Observable<Track> {
    return this.http.put<Track>(`${API.TRACK}`, track, this.httpOptions);
  }

  deleteTrack(id: number): Observable<Track> {
    return this.http.delete<Track>(`${API.TRACK}/${id}`, this.httpOptions);
  }
}
