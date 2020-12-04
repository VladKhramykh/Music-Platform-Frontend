import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {UsersData} from '../../app/shared/models/user-request.model';
import {UserUpdateRequest} from '../../app/shared/models/user-update-request';
import {UserCreateRequest} from '../../app/shared/models/user-create-request';
import {UserModel} from '../../app/shared/models/user.model';

@Injectable({providedIn: 'root'})
export class UsersService {

  private usersUrl = `${environment.apiEndpoint}users`;

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
}
