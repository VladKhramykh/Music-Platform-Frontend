import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {UsersData} from '../../app/shared/models/user-request.model';
import {UserUpdateRequest} from '../../app/shared/models/user-update-request';
import {UserCreateRequest} from '../../app/shared/models/user-create-request';
import {UserModel} from '../../app/shared/models/user.model';
import {BaseResponseModel} from '../../app/shared/models/base-response.model';

const API = {
  SEARCH: 'https://itunes.apple.com/search?',
  LOOKUP: 'https://itunes.apple.com/lookup?',
  ALBUM: 'http://localhost:8081/api/albums?',
  TRACK: 'http://localhost:8081/api/tracks?',
  ARTIST: 'http://localhost:8081/api/artists',
};

@Injectable({providedIn: 'root'})
export class UsersService {

  user = JSON.parse(localStorage.getItem('user'));

  private usersUrl = `${environment.apiEndpoint}users`;
  private artistsUrl = `${environment.apiEndpoint}artists`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getUsers(sort: string, order: string, pageNum: number, pageSize: number, filterValue?: string): Observable<UsersData> {
    let url = `${this.usersUrl}/?sortOrder=${sort + order}&pageNum=${pageNum}&pageSize=${pageSize}`;
    if (filterValue) {
      url += `&searchName=${filterValue}`;
    }
    return this.http.get<UsersData>(url);
  }

  addUser(user: UserCreateRequest): Observable<UserModel> {
    return this.http.post<UserModel>(this.usersUrl, user, this.httpOptions);
  }

  updateUser(user: UserUpdateRequest): Observable<UserUpdateRequest> {
    return this.http.put<UserUpdateRequest>(this.usersUrl, user, this.httpOptions);
  }

  deleteUser(id: number) {
    const url = `${this.usersUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }

  likeTrack(id: number) {
    return this.http.get(API.TRACK+`/like?trackId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  dislikeTrack(id: number) {
    return this.http.get(API.TRACK+`/dislike?trackId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  likeAlbum(id: number) {
    return this.http.get(API.ALBUM+`/like?albumId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  dislikeAlbum(id: number) {
    return this.http.get(API.ALBUM+`/dislike?albumId=${id}&userId=${this.user.id}`, this.httpOptions);
  }



  findArtistsByNameContains(param: string): Observable<BaseResponseModel> {
    return this.http.get<any>(API.ARTIST + `/search?name=${param}&pageSize=7&pageNum=0&artistSort=NAME_ASC`, this.httpOptions);
  }
}
