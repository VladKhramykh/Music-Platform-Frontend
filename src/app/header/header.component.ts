import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {ItunesService} from '../shared/itunes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchInput: ElementRef;
  hideResult: boolean;
  searchResults: Array<any> = [];

  constructor(private itunesService: ItunesService) {
  }

  ngOnInit(): void {
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
        this.hideResult = false;
        this.searchResults = data['results'];
      },
      err => console.log(err)
    );
  }
}
