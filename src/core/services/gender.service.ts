import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class GenderService {

  private genderUrl = `${environment.apiEndpoint}genders`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getGenders(): Observable<string[]> {
    let url = `${this.genderUrl}`;
    return this.http.get<string[]>(url);
  }

  addGender(gender: string): Observable<string> {
    return this.http.post<string>(this.genderUrl, gender, this.httpOptions);
  }

  updateGender(gender: string): Observable<string> {
    return this.http.put<string>(this.genderUrl, gender, this.httpOptions);
  }

  deleteGender(id: number) {
    const url = `${this.genderUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
