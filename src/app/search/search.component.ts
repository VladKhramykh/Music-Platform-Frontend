import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Observable} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {UsersService} from '../../core/services/user.service';
import {Artist} from '../shared/models/artist.model';
import {Router} from '@angular/router';
import {MusicService} from '../../core/services/music.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef;
  searchResults: Artist[] = [];
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
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search(this.searchInput.nativeElement.value);
      });
  }

  search(param) {
    this.musicService.findArtistsByNameContains(param).subscribe(
      data => {
        this.isResultDisplaying = true;
        this.searchResults = data.content;
      },
      err => console.log(err)
    );
  }


}
