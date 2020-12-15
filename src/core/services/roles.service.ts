import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class RolesService {

  private rolesUrl = `${environment.apiEndpoint}roles`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getRoles(): Observable<string[]> {
    let url = `${this.rolesUrl}`;
    return this.http.get<string[]>(url);
  }
}
