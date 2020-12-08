import {Injectable} from '@angular/core';

import {SessionData} from './models/session-data.model';
import {UserModel} from './models/user.model';

@Injectable({providedIn: 'root'})
export class Globals {
  user: UserModel;
  token: string;
}
