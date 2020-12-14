import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Album} from '../shared/models/album.model';
import {UsersService} from '../../core/services/user.service';
import {NotificationService} from '../../core/services/notification.service';
import {UserModel} from '../shared/models/user.model';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
})
export class AlbumComponent implements OnInit {
  album: Album;
  artistName: string;
  artistId: string;
  isLiked: boolean;
  currentUser: UserModel;

  @Input()
  set albumProp(album: Album) {
    this.album = album;
  }

  displayedColumns: string[] = [
    'artworkUrl60',
    'collectionName',
    'releaseDate',
  ];

  constructor(
    private usersService: UsersService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.isLiked = this.album.likes.findIndex(u => this.currentUser.id === u.id) != -1;
  }


  likeButtonClickHandler(id: number): void {
    this.isLiked ? this.dislike(id) : this.like(id);
  }

  like(id: number) {
    this.usersService.likeAlbum(id).subscribe(
      data => {
        this.isLiked = true;
        this.notificationService.openSnackBar('This album added to your favourite');
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }

  dislike(id: number) {
    this.usersService.dislikeAlbum(id).subscribe(
      data => {
        this.isLiked = false;
        this.notificationService.openSnackBar('This album removed to your favourite');
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }
}
