import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "../../shared/models/user.model";
import {MatTable} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MusicService} from "../../../core/services/music.service";
import {catchError, map, startWith, switchMap} from "rxjs/operators";
import {NotificationService} from "../../../core/services/notification.service";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {merge, of} from "rxjs";
import {AlbumDialogboxComponent} from "../album-dialogbox/album-dialogbox.component";
import {AlbumDialogData} from "../../shared/models/utils/album-dialog-data.model";
import {UsersService} from "../../../core/services/user.service";
import {UserDialogboxComponent} from "../user-dialogbox/user-dialogbox.component";
import {UserCreateRequest} from "../../shared/models/user-create-request";
import {UserUpdateRequest} from "../../shared/models/user-update-request";

@Component({
  selector: 'app-user-datagrid',
  templateUrl: './user-datagrid.component.html',
  styleUrls: ['./user-datagrid.component.css']
})
export class UserDatagridComponent implements OnInit {

  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'birthday', 'roles', 'gender', 'country', 'password', 'action'];
  users: UserModel[] = [];

  resultsLength = 0;
  pageSize = 10;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private musicService: MusicService,
    private usersService: UsersService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updateUsers();
  }

  updateUsers(filterValue?: string): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.usersService.getUsersByPage(this.paginator.pageIndex, this.pageSize, filterValue, this.sort.active + '_' + this.sort.direction);
        }),
        map(result => {
          this.resultsLength = result.numberOfElements;
          return result.content;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe(users => this.users = users);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateUsers(filterValue);
  }

  openDialog(obj: AlbumDialogData): void {
    const dialogRef = this.dialog.open(UserDialogboxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Add') {
        this.addUser(result.item);
      } else if (result.action === 'Update') {
        this.updateUser(result.item);
      } else if (result.action === 'Delete') {
        this.deleteUser(result.item.id);
      }
    });
  }

  addUser(user: UserCreateRequest): void {
    this.usersService.addUser(user).subscribe(() => {
      this.notificationService.openSnackBar('User created');
      this.updateUsers();
    });
  }

  updateUser(user: UserUpdateRequest): void {
    this.usersService.updateUser(user).subscribe(() => {
      this.notificationService.openSnackBar('User updated');
      this.updateUsers();
    });
  }

  deleteUser(id: number): void {
    this.usersService.deleteUser(id).subscribe(
      () => {
        this.notificationService.openSnackBar('User deleted');
        this.updateUsers();
      },
      error => {
        this.notificationService.openSnackBar('Error');
      });
  }

}
