import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Globals} from "./globals";
import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private globals: Globals
  ) {
  }

  private playTrackSource = new Subject<string>();
  private pauseTrackSource = new Subject();
  private trackEndedSource = new Subject();

  playTrack$ = this.playTrackSource.asObservable();
  pauseTrack$ = this.pauseTrackSource.asObservable();
  trackEnded$ = this.trackEndedSource.asObservable();

  playTrack(url: string) {
    this.playTrackSource.next(`${environment.uploadUrl}tracks/` + url);
  }

  pauseTrack() {
    this.pauseTrackSource.next();
  }

  trackEnded() {
    this.trackEndedSource.next();
  }
}
