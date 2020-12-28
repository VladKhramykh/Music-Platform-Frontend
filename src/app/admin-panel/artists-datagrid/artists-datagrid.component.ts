import {Component, OnInit, ViewChild} from '@angular/core';
import {Artist} from '../../shared/models/artist.model';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {MusicService} from '../../../core/services/music.service';
import {NotificationService} from '../../../core/services/notification.service';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {ArtistDialogData} from '../../shared/models/utils/artist-dialog-data.model';
import {ArtistDialogboxComponent} from '../artist-dialogbox/artist-dialogbox.component';

@Component({
  selector: 'app-artists-datagrid',
  templateUrl: './artists-datagrid.component.html',
  styleUrls: ['./artists-datagrid.component.css']
})
export class ArtistsDatagridComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'createdDate', 'createdBy', 'lastModifiedBy', 'action'];
  artists: Artist[] = [];

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
    this.updateArtists('');
  }

  updateArtists(filterValue?: string): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.musicService.getArtistsByNameAndPage(this.paginator.pageIndex, this.pageSize, filterValue, this.sort.active + '_' + this.sort.direction);
        }),
        map(result => {
          this.resultsLength = result.numberOfElements;
          return result.content;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe(artists => this.artists = artists);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateArtists(filterValue);
  }

  openDialog(obj: ArtistDialogData): void {
    const dialogRef = this.dialog.open(ArtistDialogboxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Add') {
        this.addArtist(result.item);
      } else if (result.action === 'Update') {
        this.updateArtist(result.item);
      } else if (result.action === 'Delete') {
        console.log(result.item);
        this.deleteArtist(result.item.id);
      }
    });
  }

  addArtist(artist: FormData): void {
    this.musicService.addArtist(artist).subscribe(() => {
      this.notificationService.openSnackBar('Artist created');
      this.updateArtists();
    }, error => {
      this.notificationService.openSnackBar('Artist updated');
      this.updateArtists();
    });
  }

  updateArtist(artist: FormData): void {
    this.musicService.updateArtist(artist).subscribe(() => {
      this.notificationService.openSnackBar('Artist updated');
      this.updateArtists();
    }, error => {
      this.notificationService.openSnackBar('Artist updated');
      this.updateArtists();
    });
  }

  deleteArtist(id: number): void {
    this.musicService.deleteArtist(id).subscribe(
      () => {
        this.notificationService.openSnackBar('Artist deleted');
        this.updateArtists();
      },
      error => {
        this.notificationService.openSnackBar('Error');
        this.updateArtists();
      });
  }
}
