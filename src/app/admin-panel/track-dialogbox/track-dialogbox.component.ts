import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {Artist} from '../../shared/models/artist.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MusicService} from '../../../core/services/music.service';
import {map, startWith} from 'rxjs/operators';
import {Album} from '../../shared/models/album.model';
import {Track} from '../../shared/models/track.model';
import {Category} from '../../shared/models/category.model';

@Component({
  selector: 'app-track-dialogbox',
  templateUrl: './track-dialogbox.component.html',
  styleUrls: ['./track-dialogbox.component.css']
})
export class TrackDialogboxComponent implements OnInit {
  trackForm: FormGroup;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredArtists: Observable<Artist[]>;
  filteredCategories: Observable<Category[]>;
  selectedArtists: Artist[] = [];
  selectedCategories: Category[] = [];
  selectedAlbum: Album;
  albums: Album[] = [];
  track: Track;
  availableArtists: Artist[] = [];
  availableCategories: Category[] = [];
  types: string[] = [];

  formData: FormData = new FormData();

  @ViewChild('artistInput') artistInput: ElementRef<HTMLInputElement>;
  @ViewChild('categoriesInput') categoriesInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private dialogRef: MatDialogRef<TrackDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private musicService: MusicService
  ) {
  }

  ngOnInit(): void {
    this.musicService.getArtistsByPage(0, 10, '', 'NAME_ASC').subscribe(
      data => {
        this.availableArtists = data.content;
      }
    );

    this.musicService.getCategories().subscribe(
      data => {
        this.availableCategories = data;
      }
    );

    this.musicService.getTrackTypes().subscribe(
      data => {
        this.types = data;
      }
    );

    this.trackForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : null, []],
      name: [this.data.item ? this.data.item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [this.data.item ? this.data.item.description : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      type: [this.data.item ? this.data.item.type : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      categories: [this.data.item ? (this.selectedCategories = this.data.item.categories) : [], [Validators.required]],
      releaseDate: [this.data.item ? new Date(this.data.item.releaseDate).toISOString().substring(0, 10) : '', [Validators.required]],
      artists: [this.data.item ? (this.selectedArtists = this.data.item.artists) : [], [Validators.required]],
      album: [this.data.item ? (this.selectedAlbum = this.data.item.album) : {}, [Validators.required]],
      track: [this.data.item ? this.data.item.trackUri : ''],
      trackFile: new FormControl(),
      photoFile: new FormControl()
    });
    this.filteredArtists = this.trackForm.controls.artists.valueChanges.pipe(
      startWith(null),
      map((artistName: string | null) => artistName ? this._filterArtists(artistName) : this.availableArtists.slice()));
    this.filteredCategories = this.trackForm.controls.categories.valueChanges.pipe(
      startWith(null),
      map((categoryName: string | null) => categoryName ? this._filterCategories(categoryName) : this.availableCategories.slice()));
  }

  submit(): void {
    this.trackForm.controls.artists.setValue(this.selectedArtists.map(x => x.id));
    this.trackForm.controls.categories.setValue(this.selectedCategories.map(x => x.id));

    if (this.data.item) {
      this.formData.append('id', this.trackForm.controls.id.value);
    }
    this.formData.append('name', this.trackForm.get('name').value);
    this.formData.append('type', this.trackForm.get('type').value);
    this.formData.append('description', this.trackForm.get('description').value);
    this.formData.append('album', this.trackForm.get('album').value.id);
    this.formData.append('trackText', 'lakjfglaksjg;lkjsdjglkaglksd');
    this.formData.append('categories', this.trackForm.get('categories').value);
    this.formData.append('releaseDate', this.trackForm.get('releaseDate').value.toISOString());
    this.formData.append('artists', this.trackForm.get('artists').value);

    this.dialogRef.close({action: this.data.action, item: this.formData});
  }

  removeArtist(artist: Artist): void {
    const index = this.selectedArtists.indexOf(artist);
    if (index >= 0) {
      this.selectedArtists.splice(index, 1);
    }
    this.updateAlbums();
  }

  selectedArtis(event: MatAutocompleteSelectedEvent): void {
    this.selectedArtists.push(event.option.value);
    this.artistInput.nativeElement.value = '';
    this.updateAlbums();
  }

  removeCategory(category: Category): void {
    const index = this.selectedCategories.indexOf(category);
    if (index >= 0) {
      this.selectedCategories.splice(index, 1);
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    this.selectedCategories.push(event.option.value);
    this.categoriesInput.nativeElement.value = '';
  }

  updateAlbums(): void {
    this.albums.splice(0, this.albums.length);
    this.selectedArtists.forEach(item => {
      this.musicService.getAlbumsByArtistId(item.id).subscribe(
        data => {
          data.forEach(i => {
            this.albums.push(i);
          });
        }
      );
    });
  }

  trackFileChange(event): void{
    const fileList: FileList = event.target.files;
    console.log(fileList[0]);
    this.formData.append('trackFile', fileList[0]);
  }

  photoFileChange(event): void {
    const fileList: FileList = event.target.files;
    this.formData.append('photoFile', fileList[0]);
  }

  private _filterArtists(artistName: string): Artist[] {
    const filterValue = artistName;
    return this.availableArtists.filter(artist => artist.name.includes(filterValue));
  }

  private _filterCategories(categoryName: string): Category[] {
    const filterValue = categoryName;
    return this.availableCategories.filter(category => category.name.includes(filterValue));
  }

}
