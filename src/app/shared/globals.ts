import {Injectable} from '@angular/core';
import {UserModel} from './models/user.model';

@Injectable({providedIn: 'root'})
export class Globals {
  user: UserModel;
  token: string;
  uploadUri: 'http://localhost:8081/img/tracks/';
}
