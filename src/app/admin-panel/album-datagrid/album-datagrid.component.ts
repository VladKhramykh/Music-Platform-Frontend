import {Component, OnInit, ViewChild} from '@angular/core';
import {Album} from '../../shared/models/album.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MusicService} from '../../../core/services/music.service';
import {NotificationService} from '../../../core/services/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {AlbumDialogData} from '../../shared/models/utils/album-dialog-data.model';
import {AlbumDialogboxComponent} from '../album-dialogbox/album-dialogbox.component';

@Component({
  selector: 'app-album-datagrid',
  templateUrl: './album-datagrid.component.html',
  styleUrls: ['./album-datagrid.component.css']
})
export class AlbumDatagridComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'releaseDate', 'type', 'artists', 'action'];
  albums: Album[] = [];

  resultsLength = 0;
  pageSize = 10;

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private dialog: MatDialog,
    private musicService: MusicService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.updateAlbums();
  }

  updateAlbums(filterValue?: string): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.musicService.getAlbumsByPage(this.paginator.pageIndex, this.pageSize, filterValue, this.sort.active + '_' + this.sort.direction);
        }),
        map(result => {
          this.resultsLength = result.numberOfElements;
          return result.content;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe(albums => this.albums = albums);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateAlbums(filterValue);
  }

  openDialog(obj: AlbumDialogData): void {
    const dialogRef = this.dialog.open(AlbumDialogboxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Add') {
        this.addAlbum(result.item);
      } else if (result.action === 'Update') {
        this.updateAlbum(result.item);
      } else if (result.action === 'Delete') {
        this.deleteAlbum(result.item.id);
      }
    });
  }

  addAlbum(album: FormData): void {
    this.musicService.addAlbum(album).subscribe(() => {
      this.notificationService.openSnackBar('Album created');
      this.updateAlbums();
    });
  }

  updateAlbum(album: FormData): void {
    this.musicService.updateAlbum(album).subscribe(() => {
      this.notificationService.openSnackBar('Album updated');
      this.updateAlbums();
    });
  }

  deleteAlbum(id: number): void {
    this.musicService.deleteAlbum(id).subscribe(
      () => {
        this.notificationService.openSnackBar('Album deleted');
        this.updateAlbums();
      },
      error => {
        this.notificationService.openSnackBar('Error');
      });
  }
}
