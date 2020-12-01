import {environment} from '../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Country} from '../../app/shared/models/country.model';

@Injectable({providedIn: 'root'})
export class CountryService {

  private countryUrl = `${environment.endpoint}countries`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    let url = `${this.countryUrl}`;
    return this.http.get<Country[]>(url);
  }

  getCountriesByPage(sort: string, order: string, pageNum: number, pageSize: number, filterValue?: string): Observable<Country[]> {
    let url = `${this.countryUrl}/?sortOrder=${sort + order}&pageNum=${pageNum}&pageSize=${pageSize}`;
    if (filterValue) {
      url += `&searchName=${filterValue}`;
    }
    return this.http.get<Country[]>(url);
  }

  addCountry(country: Country): Observable<Country> {
    return this.http.post<Country>(this.countryUrl, country, this.httpOptions);
  }

  updateCountry(country: Country): Observable<Country> {
    return this.http.put<Country>(this.countryUrl, country, this.httpOptions);
  }

  deleteCountry(id: number) {
    const url = `${this.countryUrl}/${id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
