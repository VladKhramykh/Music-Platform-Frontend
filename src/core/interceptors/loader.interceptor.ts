import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Event, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';

import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

import {LoaderService} from '../services/loader.service';

@Injectable({providedIn: 'root'})
export class LoaderInterceptor {

  requestCount = 0;

  constructor(private loaderService: LoaderService, private router: Router) {
    this.router.events.subscribe((event: Event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaderService.show();
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationError:
        case event instanceof NavigationCancel: {
          this.loaderService.hide();
          break;
        }
        default: {
          break;
        }
          ;
      }
    });
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestCount++;
    Promise.resolve(null).then(() => this.loaderService.show());
    return next.handle(req).pipe(
      finalize(() => {
        this.requestCount--;
        if (this.requestCount === 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
