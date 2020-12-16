import {Injectable} from '@angular/core';
import {UserModel} from './models/user.model';

@Injectable({providedIn: 'root'})
export class Globals {
  user: UserModel;
  token: string;
  uploadTrackUri: 'http://localhost:8081/img/tracks/';
  static: {
    notPhotoProfileUrl: '/assets/static/no_photo_profile.jpg',
    notPhotoTrackUrl: '/assets/static/imposter.png',
    notPhotoTrackAlbum: '/assets/static/imposter.png',
  }
}
