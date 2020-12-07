import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @ViewChild('searchBox') searchInput: ElementRef;
  hideResult: boolean;
  searchResults: Array<any> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }

}
