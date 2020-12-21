import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {UsersService} from '../../core/services/user.service';
import {Artist} from '../shared/models/artist.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  searchResults: Artist[] = [];
  // searchResults: string[] = ["asd", "asd", "rqrqwrqwr"];
  isResultDisplaying: boolean = false;

  constructor(private musicService: UsersService,
              private router: Router) {
  }

  ngOnInit() {

  }

  onResultClick() {
    this.isResultDisplaying = false;
    this.searchInput.nativeElement.value = '';
  }

  ngAfterViewInit(): void {
    let buttonStream$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.search(this.searchInput.nativeElement.value);
      });
  }

  search(param) {
    if(param.trim().length != 0) {
      this.musicService.findArtistsByNameContains(param).subscribe(
        data => {
          if(data.content.length > 0) {
            this.isResultDisplaying = true;
            this.searchResults = data.content;
          } else {
            this.isResultDisplaying = false;
          }
        },
        err => console.log(err)
      );
    } else {
      this.isResultDisplaying = false;
    }

  }


}
