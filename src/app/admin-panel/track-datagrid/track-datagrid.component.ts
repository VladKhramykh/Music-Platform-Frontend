import {Component, OnInit, ViewChild} from '@angular/core';
import {MusicService} from '../../../core/services/music.service';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {NotificationService} from '../../../core/services/notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {merge, of} from 'rxjs';
import {MatTable} from '@angular/material/table';
import {Track} from '../../shared/models/track.model';
import {TrackDialogboxComponent} from '../track-dialogbox/track-dialogbox.component';
import {TrackDialogData} from '../../shared/models/utils/track-dialog-data.model';

@Component({
  selector: 'app-track-datagrid',
  templateUrl: './track-datagrid.component.html',
  styleUrls: ['./track-datagrid.component.css']
})
export class TrackDatagridComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'releaseDate', 'type', 'artists', 'categories', 'album', 'action'];
  tracks: Track[] = [];

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
    this.updateTracks();
  }

  updateTracks(filterValue?: string): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.musicService.getTracksByPage(this.paginator.pageIndex, this.pageSize, filterValue, this.sort.active + '_' + this.sort.direction);
        }),
        map(result => {
          this.resultsLength = result.numberOfElements;
          return result.content;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe(tracks => this.tracks = tracks);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateTracks(filterValue);
  }

  openDialog(obj: TrackDialogData): void {
    const dialogRef = this.dialog.open(TrackDialogboxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Add') {
        this.addTrack(result.item);
      } else if (result.action === 'Update') {
        this.updateTrack(result.item);
      } else if (result.action === 'Delete') {
        this.deleteTrack(result.item.id);
      }
    });
  }

  addTrack(formData: FormData): void {
    this.musicService.addTrack(formData)
      .subscribe(
        (data) => {
          console.log(data);
          this.notificationService.openSnackBar('Track created');
          this.updateTracks();
        },
        error => {
          // TODO change!!!!!!!!
          console.log(error);
          this.notificationService.openSnackBar('Track created');
          this.updateTracks();
          // window.location.reload();
        });
  }

  updateTrack(track: FormData): void {
    this.musicService.updateTrack(track).subscribe(
      (data) => {
        this.notificationService.openSnackBar('Track updated');
        this.updateTracks();
      },
      error => {
        this.notificationService.openSnackBar('Track updated');
        this.updateTracks();
      });
  }

  deleteTrack(id: number): void {
    this.musicService.deleteTrack(id).subscribe(
      () => {
        this.notificationService.openSnackBar('Track deleted');
        this.updateTracks();
      },
      error => {
        this.notificationService.openSnackBar('Error');
      });
  }
}
