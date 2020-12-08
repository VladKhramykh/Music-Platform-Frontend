import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {SessionData} from '../../app/shared/models/session-data.model';
import {environment} from '../../environments/environment.prod';
import {Globals} from '../../app/shared/globals';
import {SessionStorageService} from './session-storage.service';
import {UserModel} from '../../app/shared/models/user.model';

@Injectable({providedIn: 'root'})

export class AuthService {
  private loginURL = `${environment.endpoint}authenticate`;

  constructor(
    private http: HttpClient,
    private globals: Globals,
    private sessionService: SessionStorageService
  ) {
  }

  login(username: string, password: string) {
    return this.http.post<SessionData>(this.loginURL, {
      username, password
    }, {headers: new HttpHeaders({'Content-Type': 'application/json'})});
  }

  logout() {
    sessionStorage.clear();
    this.globals.user = null;
  }

  getUser(): UserModel {
    const currentUser = (this.sessionService.getUser() ? this.sessionService.getUser() : null) ?? this.globals.user;
    return currentUser;
  }

  getToken(): string {
    let token = this.sessionService.getToken();
    if (!token && this.globals.user) {
      token = this.globals.token;
    }
    return token;
  }
}
