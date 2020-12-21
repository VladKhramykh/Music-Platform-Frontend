import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserUpdateRequest} from '../../app/shared/models/user-update-request';
import {UserCreateRequest} from '../../app/shared/models/user-create-request';
import {UserModel} from '../../app/shared/models/user.model';
import {BaseResponseModel} from '../../app/shared/models/base-response.model';
import {AuthService} from './auth.service';
import {SessionStorageService} from './session-storage.service';

const API = {
  ALBUM: `${environment.apiEndpoint}albums`,
  TRACK: `${environment.apiEndpoint}tracks`,
  ARTIST: `${environment.apiEndpoint}artists`,
  CATEGORIES: `${environment.apiEndpoint}categories`,
  USERS: `${environment.apiEndpoint}users`,
};

@Injectable({providedIn: 'root'})
export class UsersService {

  user: UserModel;

  private usersUrl = `${environment.apiEndpoint}users`;
  private artistsUrl = `${environment.apiEndpoint}artists`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService) {
    this.user = this.authService.getUser();
  }

  updatePhoto(event, id) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('file', file);
      formData.append('id', id);
      this.http.post(`${API.USERS}/photo`, formData)
        .subscribe(
          data => console.log('success'),
          error => {
            this.user = this.sessionStorageService.getUser();
            this.user.photoUri = error.error.text;
            this.sessionStorageService.saveUser(this.user);
          }
        );
    }
  }

  getUsersByPage(pageNum: number, pageSize: number, filterValue: string, sort: string): Observable<BaseResponseModel> {
    let url = `${API.USERS}?pageNum=${pageNum}&pageSize=${pageSize}&userSort=${sort.toUpperCase()}`;
    if (filterValue) {
      url += `&filter=${filterValue}`;
    }
    return this.http.get<BaseResponseModel>(url, this.httpOptions);
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
    return this.http.get(API.TRACK + `/like?trackId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  dislikeTrack(id: number) {
    return this.http.get(API.TRACK + `/dislike?trackId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  likeAlbum(id: number) {
    return this.http.get(API.ALBUM + `/like?albumId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  dislikeAlbum(id: number) {
    return this.http.get(API.ALBUM + `/dislike?albumId=${id}&userId=${this.user.id}`, this.httpOptions);
  }

  findArtistsByNameContains(param: string): Observable<BaseResponseModel> {
    return this.http.get<any>(API.ARTIST + `?filter=${param}&pageSize=7&pageNum=0&artistSort=NAME_ASC`, this.httpOptions);
  }
}
