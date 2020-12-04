import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class CountryService {

  private countryUrl = `${environment.apiEndpoint}countries`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<string[]> {
    let url = `${this.countryUrl}`;
    return this.http.get<string[]>(url);
  }

  getCountriesByPage(sort: string, order: string, pageNum: number, pageSize: number, filterValue?: string): Observable<string[]> {
    let url = `${this.countryUrl}/?sortOrder=${sort + order}&pageNum=${pageNum}&pageSize=${pageSize}`;
    if (filterValue) {
      url += `&searchName=${filterValue}`;
    }
    return this.http.get<string[]>(url);
  }

  addCountry(country: string): Observable<string> {
    return this.http.post<string>(this.countryUrl, country, this.httpOptions);
  }

  updateCountry(country: string): Observable<string> {
    return this.http.put<string>(this.countryUrl, country, this.httpOptions);
  }

  deleteCountry(id: number) {
    const url = `${this.countryUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
