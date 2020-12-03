import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ItunesService} from './shared/itunes.service';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchInput: ElementRef;
  // (keyup)="search(searchBox.value)"

  url;
  hideResult: boolean;
  searchResults: Array<any> = [];

  constructor(private itunesService: ItunesService, location: Location, router: Router) {
    router.events.subscribe(val => {
      this.url = location.path();
    });
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let buttonStream$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search(this.searchInput.nativeElement.value);
      });

  }

  onResultClick() {
    this.hideResult = true;
    this.searchInput.nativeElement.value = '';
  }

  search(param) {
    this.itunesService.search(param).subscribe(
      data => {
        // console.log(data['results']);
        this.hideResult = false;
        this.searchResults = data['results'];
      },
      err => console.log(err)
    );
  }
}
