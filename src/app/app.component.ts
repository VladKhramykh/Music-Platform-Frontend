import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  url: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      this.url = location.path();
    });
  }

  ngOnInit() {

  }


}
