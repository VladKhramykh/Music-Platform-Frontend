import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {UserModel} from './shared/models/user.model';
import {AuthService} from '../core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  url: string;
  currentUser: UserModel;
  isExpanded = true;

  constructor(private location: Location,
              private router: Router,
              private authService: AuthService) {
    router.events.subscribe(val => {
      this.url = location.path();
    });
  }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
    window.location.reload();
  }
}
