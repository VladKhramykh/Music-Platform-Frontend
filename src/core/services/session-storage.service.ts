import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class SessionStorageService {

  constructor() { }

  public saveToken(token: string) {
    sessionStorage.removeItem('auth-token');
    sessionStorage.setItem('auth-token', token);
  }

  public getToken(): string {
    return sessionStorage.getItem('auth-token');
  }

  public saveUser(user) {
    sessionStorage.removeItem('auth-user');
    sessionStorage.setItem('auth-user', JSON.stringify(user));
  }

  public logout() {
    sessionStorage.removeItem('auth-user');
    sessionStorage.removeItem('auth-token');
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem('auth-user'));
  }

}
