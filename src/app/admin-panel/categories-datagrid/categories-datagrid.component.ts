import {Component, OnInit, ViewChild} from '@angular/core';
import {MusicService} from '../../../core/services/music.service';
import {Category} from '../../shared/models/category.model';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {merge, of} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {CategoryDialogData} from '../../shared/models/utils/category-dialog-data.model';
import {CategoryDialogboxComponent} from '../category-dialogbox/category-dialogbox.component';
import {NotificationService} from '../../../core/services/notification.service';

@Component({
  selector: 'app-categories-datagrid',
  templateUrl: './categories-datagrid.component.html',
  styleUrls: ['./categories-datagrid.component.css']
})
export class CategoriesDatagridComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'action'];
  categories: Category[] = [];

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
    this.updateCategories();
  }

  updateCategories(filterValue?: string): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.musicService.getCategoriesByPage(this.paginator.pageIndex, this.pageSize, filterValue, this.sort.active + '_' + this.sort.direction);
        }),
        map(result => {
          this.resultsLength = result.numberOfElements;
          return result.content;
        }),
        catchError(() => {
          return of([]);
        })
      ).subscribe(categories => this.categories = categories);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.updateCategories(filterValue);
  }

  openDialog(obj: CategoryDialogData): void {
    const dialogRef = this.dialog.open(CategoryDialogboxComponent, {
      width: '400px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.action === 'Add') {
        this.addCategory(result.item);
      } else if (result.action === 'Update') {
        this.updateCategory(result.item);
      } else if (result.action === 'Delete') {
        this.deleteCategory(result.item.id);
      }
    });
  }

  addCategory(category: Category): void {
    this.musicService.addCategory(category).subscribe(() => {
      this.notificationService.openSnackBar('Category created');
      this.updateCategories();
    });
  }

  updateCategory(category: Category): void {
    console.log(category);
    this.musicService.updateCategory(category).subscribe(() => {
      this.notificationService.openSnackBar('Category updated');
      this.updateCategories();
    });
  }

  deleteCategory(id: number): void {
    this.musicService.deleteCategory(id).subscribe(
      () => {
        this.notificationService.openSnackBar('Category deleted');
        this.updateCategories();
      },
      error => {
        this.notificationService.openSnackBar('Error');
      });
  }

}
