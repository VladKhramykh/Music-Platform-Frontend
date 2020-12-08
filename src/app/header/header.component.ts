import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchBox') searchInput: ElementRef;
  hideResult: boolean;
  currentUser: UserModel;
  searchResults: Array<any> = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
  }
}
