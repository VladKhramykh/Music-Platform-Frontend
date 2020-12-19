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

  httpOptionsMultipartForm = {
    headers: new HttpHeaders({'Content-Type': 'multipart/form-data'})
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
    return this.http.get<Album[]>(`${API.ALBUM}/artist?artistId=${id}&albumSort=ID_ASC`, this.httpOptions);
  }

  getTracksByArtistId(id: number, pageSize: number, pageNum: number): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.TRACK}?artistId=${id}&pageSize=${pageSize}&pageNum=${pageNum}&trackSort=NAME_ASC`, this.httpOptions);
  }

  getTracksByAlbumId(id: number): Observable<Track[]> {
    return this.http.get<Track[]>(`${API.TRACK}/album?albumId=${id}&trackSort=ID_ASC`, this.httpOptions);
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

  addArtist(artist: FormData) {
    return this.http.post<Artist>(`${API.ARTIST}`, artist);
  }

  updateArtist(artist: FormData) {
    return this.http.put<Artist>(`${API.ARTIST}`, artist);
  }

  deleteArtist(id: number): Observable<Artist> {
    return this.http.delete<Artist>(`${API.ARTIST}/${id}`, this.httpOptions);
  }

  addAlbum(album: FormData) {
    return this.http.post<Album>(`${API.ALBUM}`, album);
  }

  updateAlbum(album: FormData) {
    return this.http.put<Album>(`${API.ALBUM}`, album);
  }

  deleteAlbum(id: number): Observable<Album> {
    return this.http.delete<Album>(`${API.ALBUM}/${id}`, this.httpOptions);
  }

  getAlbumTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${API.ALBUM}/types`, this.httpOptions);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API.CATEGORIES}/all`, this.httpOptions);
  }

  getTracksByPage(pageNum: number, pageSize: number, filterValue: string, sort: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.TRACK}?pageNum=${pageNum}&pageSize=${pageSize}&trackSort=${sort.toUpperCase()}`, this.httpOptions);
  }

  getTrackTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${API.TRACK}/types`, this.httpOptions);
  }

  addTrack(track: FormData) {
    return this.http.post(`${API.TRACK}`, track);
  }

  updateTrack(track: FormData): Observable<Track> {
    return this.http.put<Track>(`${API.TRACK}`, track);
  }

  deleteTrack(id: number): Observable<Track> {
    return this.http.delete<Track>(`${API.TRACK}/${id}`, this.httpOptions);
  }

  getLastTrackReleases(pageNum: number, pageSize: number, sort: string): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.TRACK}/last?pageNum=${pageNum}&pageSize=${pageSize}&trackSort=${sort}`, this.httpOptions);
  }

  getLastAlbumReleases(pageNum: number, pageSize: number): Observable<BaseResponseModel> {
    return this.http.get<BaseResponseModel>(`${API.ALBUM}/last?pageNum=${pageNum}&pageSize=${pageSize}`, this.httpOptions);
  }

  getFavouriteTracksByPage(pageNum: number, pageSize: number, sort: string) {
    return this.http.get<BaseResponseModel>(`${API.TRACK}/favourite?pageNum=${pageNum}&pageSize=${pageSize}&trackSort=${sort}`, this.httpOptions);
  }

  getFavouriteAlbums(albumPageNum: number, albumPageSize: number, sort: string) {
    return this.http.get<BaseResponseModel>(`${API.ALBUM}/favourite?pageNum=${albumPageNum}&pageSize=${albumPageSize}&albumSort=${sort}`, this.httpOptions);
  }

  getAlbumById(id: number): Observable<Album> {
    return this.http.get<Album>(`${API.ALBUM}/${id}`, this.httpOptions);
  }
}
