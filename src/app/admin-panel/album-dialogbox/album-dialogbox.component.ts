import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Artist} from '../../shared/models/artist.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MusicService} from '../../../core/services/music.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-album-dialogbox',
  templateUrl: './album-dialogbox.component.html',
  styleUrls: ['./album-dialogbox.component.css']
})
export class AlbumDialogboxComponent implements OnInit {
  albumForm: FormGroup;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredArtists: Observable<Artist[]>;
  selectedArtists: Artist[] = [];
  availableArtists: Artist[] = [];
  types: string[];

  formData: FormData = new FormData();


  @ViewChild('artistInput') artistInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private dialogRef: MatDialogRef<AlbumDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data,
    private musicService: MusicService
  ) {
  }

  ngOnInit(): void {
    this.musicService.getArtistsByNameAndPage(0, 100, '', 'NAME_ASC').subscribe(
      data => {
        this.availableArtists = data.content;
      }
    );
    this.musicService.getAlbumTypes().subscribe(
      data => {
        this.types = data;
      }
    );

    this.albumForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : null, []],
      name: [this.data.item ? this.data.item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [this.data.item ? this.data.item.description : '', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      type: [this.data.item ? this.data.item.type : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      releaseDate: [this.data.item ? new Date(this.data.item.releaseDate).toISOString().substring(0, 10) : '', [Validators.required]],
      artists: [this.data.item ? (this.selectedArtists = this.data.item.artists) : [], [Validators.required]],
      photo: [this.data.item ? this.data.item.photoUri : '', []],
      photoFile: new FormControl()
    });
    this.filteredArtists = this.albumForm.controls['artists'].valueChanges.pipe(
      startWith(null),
      map((artistName: string | null) => artistName ? this._filter(artistName) : this.availableArtists.slice()));
  }

  submit(): void {
    if (this.data.action == 'Delete') {
      this.dialogRef.close({action: this.data.action, item: this.albumForm.value});
    } else {
      this.albumForm.controls['artists'].setValue(this.selectedArtists.map(x => x.id));
      if (this.data.item) {
        this.formData.append('id', this.albumForm.controls.id.value);
      }
      this.formData.append('name', this.albumForm.get('name').value);
      this.formData.append('type', this.albumForm.get('type').value);
      this.formData.append('description', this.albumForm.get('description').value);
      this.formData.append('releaseDate', new Date(this.albumForm.get('releaseDate').value).toISOString());
      this.formData.append('artists', this.albumForm.get('artists').value);
      this.dialogRef.close({action: this.data.action, item: this.formData});
    }
  }

  photoFileChange(event): void {
    const fileList: FileList = event.target.files;
    this.albumForm.controls.photo.setValue(fileList[0].name);
    this.formData.append('photoFile', fileList[0]);
  }

  add(event): void {
    const value = event.value;
    if (value) {
      this.selectedArtists.push(value);
    }
  }

  remove(artist: Artist): void {
    const index = this.selectedArtists.indexOf(artist);

    if (index >= 0) {
      this.selectedArtists.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedArtists.push(event.option.value);
    this.artistInput.nativeElement.value = '';
  }

  private _filter(artistName: string): Artist[] {
    const filterValue = artistName;

    return this.availableArtists.filter(artist => artist.name.toLowerCase().includes(filterValue));
  }

}
