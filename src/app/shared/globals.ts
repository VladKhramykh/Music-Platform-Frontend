import {Injectable} from '@angular/core';

import {SessionData} from './models/session-data.model';

@Injectable({providedIn: 'root'})
export class Globals {
  user: SessionData;
}
